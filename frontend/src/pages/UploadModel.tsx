import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelUploadForm } from '../components/ModelUploadForm.tsx';
import type { ModelUploadData } from '../types/models';
import { createModel } from '../api/models.ts';

export const ModelUpload: React.FC = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (data: ModelUploadData) => {
    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);

      // Симуляция прогресса загрузки
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // add file to form data
      const formData = new FormData();
      if (data.file) {
        formData.append('file', data.file);
      }
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('framework', data.framework);
      formData.append('tags', JSON.stringify(data.tags));
      formData.append('size', data.size.toString());

      await createModel(formData);

      setUploadProgress(100);

      setTimeout(() => {
        navigate('/profile');
      }, 1000);

    } catch (err) {
      setError('Не удалось загрузить модель. Попробуйте снова.');
      console.error('Error uploading model:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>

          <h1 className="text-3xl font-bold text-gray-900">Загрузить модель</h1>
          <p className="mt-2 text-gray-600">
            Заполните информацию о модели и загрузите файлы
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-blue-700 mb-2">Загрузка модели...</p>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-600 mt-1">{uploadProgress}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg">
          <ModelUploadForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            disabled={uploading}
          />
        </div>
      </div>
    </div>
  );
};