import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ErrorComp } from '../components/ErrorComp';
import { Loading } from '../components/Loading';
import { getApiErrorMessage } from '../api/errors';
import { deleteModel, getModel } from '../api/models';
import { me } from '../api/users';
import type { Model } from '../types/models';
import type { User } from '../types/users';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function ModelDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [model, setModel] = useState<Model | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    void loadModelDetails();
  }, [id]);

  const loadModelDetails = async () => {
    if (!id) {
      setError('Model id is required');
      setLoading(false);
      return;
    }

    const modelId = Number.parseInt(id, 10);

    if (Number.isNaN(modelId)) {
      setError('Invalid model id');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [modelResult, currentUserResult] = await Promise.allSettled([
        getModel(modelId),
        me(),
      ]);

      if (modelResult.status === 'rejected') {
        throw modelResult.reason;
      }

      setModel(modelResult.value);

      if (currentUserResult.status === 'fulfilled') {
        setCurrentUser(currentUserResult.value);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to load model details'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!model || deleting) {
      return;
    }

    if (!window.confirm('Are you sure you want to delete this model?')) {
      return;
    }

    try {
      setDeleting(true);
      await deleteModel(model.id);
      navigate('/profile');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to delete model'));
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComp error={error} onClick={loadModelDetails} />;
  }

  if (!model) {
    return <div className="p-6 text-red-600">Model not found</div>;
  }

  const isOwner = currentUser?.id === model.userId;
  const downloadUrl = `${API_BASE_URL}/models/${model.id}/download`;
  const curlCommand = `curl -L -O "${downloadUrl}"`;
  const modelSize = `${(model.size / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-2">{model.name}</h1>
      <p className="text-gray-600 mb-4">{model.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {model.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500 mb-6">
        Uploaded on{' '}
        {new Date(model.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
        <div className="rounded-md bg-gray-50 p-3">
          <span className="font-medium text-gray-900">Framework:</span> {model.framework}
        </div>
        <div className="rounded-md bg-gray-50 p-3">
          <span className="font-medium text-gray-900">File size:</span> {modelSize}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Download
        </a>

        <button
          onClick={() => void navigator.clipboard.writeText(curlCommand)}
          className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
        >
          Copy cURL
        </button>
      </div>

      <div className="mb-4 bg-gray-100 p-3 rounded font-mono text-sm text-gray-800">
        {curlCommand}
      </div>

      {isOwner && (
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}

      {model.readme && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">README</h2>
          <div className="prose prose-sm sm:prose md:prose-lg max-w-none bg-gray-50 p-6 rounded-md border border-gray-200">
            <Markdown>{model.readme}</Markdown>
          </div>
        </section>
      )}
    </div>
  );
}
