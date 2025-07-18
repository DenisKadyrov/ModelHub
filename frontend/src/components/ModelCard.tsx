import React from 'react';
import type { Model } from '../types';

interface ModelCardProps {
  model: Model;
  onModelClick: (modelId: string) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onModelClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Не указан';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200 p-6"
      onClick={() => onModelClick(model.id)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          {model.name}
        </h3>
        <div className="text-sm text-gray-500">
          {formatDate(model.updatedAt)}
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {model.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {model.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Размер: {formatFileSize(model.fileSize)}</span>
        {model.downloadCount && (
          <span>Скачиваний: {model.downloadCount}</span>
        )}
      </div>
    </div>
  );
};