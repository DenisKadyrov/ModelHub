import React, { useState } from 'react';

interface ReadmeEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ReadmeEditor: React.FC<ReadmeEditorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Простой рендерер Markdown для предварительного просмотра
  const renderMarkdown = (markdown: string) => {
    return markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2">$1</h3>')
      .replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-md overflow-x-auto"><code>$2</code></pre>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[hlu]|<pre|<p)/gm, '<p class="mb-4">')
      .replace(/<\/p><p class="mb-4">$/, '</p>');
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <nav className="flex space-x-8 px-4">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'edit'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            disabled={disabled}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Редактировать
            </div>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'preview'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            disabled={disabled}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Предварительный просмотр
            </div>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'edit' ? (
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-96 p-4 border-0 resize-none focus:outline-none focus:ring-0 font-mono text-sm"
              placeholder="Введите описание в формате Markdown..."
              disabled={disabled}
            />
            {/* Markdown Hints */}
            <div className="absolute bottom-0 right-0 p-2">
              <div className="bg-gray-800 text-white text-xs rounded-lg p-2 opacity-75 max-w-xs">
                <p className="font-medium mb-1">Подсказки Markdown:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>`**жирный текст**`</li>
                  <li>`*курсив*`</li>
                  <li>```код```</li>
                  <li>`- элемент списка` или `* элемент списка`</li>
                  <li>`# Заголовок 1`, `## Заголовок 2` и т.д.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="p-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        )}
      </div>
    </div >
  );
};