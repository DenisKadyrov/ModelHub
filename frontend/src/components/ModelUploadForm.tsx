import React, { useState } from 'react';
import { FileUpload } from './FileUpload.tsx';
import { ReadmeEditor } from './ReadmeEditor.tsx';
import type { ModelUploadData } from '../types';

interface ModelUploadFormProps {
  onSubmit: (data: ModelUploadData) => void;
  onCancel: () => void;
  disabled?: boolean;
}

export const ModelUploadForm: React.FC<ModelUploadFormProps> = ({
  onSubmit,
  onCancel,
  disabled = false
}) => {
  const [formData, setFormData] = useState<ModelUploadData>({
    name: '',
    description: '',
    framework: "hi",
    readme: '# Model Name\n\n## Description\n\nDescribe your model here...\n\n## Usage\n\n```python\n# Example usage\n```\n\n## Requirements\n\n- Python 3.8+\n- PyTorch\n\n## License\n\nMIT',
    file: null,
    tags: [],
    size: 45,
  });

  const [currentTag, setCurrentTag] = useState('');

  const handleInputChange = (field: keyof ModelUploadData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString().split('T')[0]
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid = formData.name.trim() && formData.description.trim() && formData.file;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Basic Information */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Основная информация</h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Model Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Название модели *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите название модели"
              disabled={disabled}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Описание *
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="Краткое описание модели"
              disabled={disabled}
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Теги
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none"
                    disabled={disabled}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleTagKeyPress}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Добавить тег (например: python, pytorch)"
                disabled={disabled}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={disabled}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Файл модели</h2>
        <FileUpload
          onFileSelect={(file) => handleInputChange('file', file)}
          selectedFile={formData.file}
          disabled={disabled}
        />
      </div>

      {/* README */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">README</h2>
        <ReadmeEditor
          value={formData.readme}
          onChange={(value) => handleInputChange('readme', value)}
          disabled={disabled}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          disabled={disabled}
        >
          Отмена
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={disabled || !isValid}
        >
          {disabled ? 'Загрузка...' : 'Загрузить модель'}
        </button>
      </div>
    </form>
  );
};