import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import type { User } from '../types/users';
import type { Model } from '../types/models';

export const ModelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [model, setModel] = useState<Model | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const model;
    const user;

    setModel(model);
    setCurrentUser(user);
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this model?')) {
      alert('Fake delete: returning to models list');
      navigate('/models');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!model) return <div className="p-6 text-red-600">Model not found</div>;

  const isOwner = currentUser?.id === model.userId;
  const downloadUrl = `https://example.com/files/${model.id}`;
  const curlCommand = `curl -O "${downloadUrl}"`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-2">{model.name}</h1>
      <p className="text-gray-600 mb-4">{model.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {model.tags.map((tag, i) => (
          <span
            key={i}
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
          onClick={() => navigator.clipboard.writeText(curlCommand)}
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
            onClick={() => navigate(`/models/${model.id}/edit`)}
            className="px-4 py-2 bg-yellow-400 text-sm rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Delete
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
};
