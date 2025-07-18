import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileHeader } from '../components/ProfileHeader';
import { ModelsList } from '../components/ModelsList';
import type { User, Model } from '../types';
// import { modelsApi } from '../api/models';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      // const profileData = await modelsApi.getProfile();
      const profileData = {
        user: {
          id: '1',
          name: "Denis",
          email: "kripmrx@gmail.com",
          createdAt: "2025-07-18"
        },
        models: [
          {
            id: "1",
            name: "Model name",
            description: "Description of model",
            tags: ["python", "PyTorch"],
            userId: '4',
            readme: "text",
            createdAt: "2025-07-18",
            updatedAt: "2025-07-18",
          }
        ],
      };
      setUser(profileData.user);
      setModels(profileData.models);
    } catch (err) {
      setError('Не удалось загрузить данные профиля');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModelClick = (modelId: string) => {
    navigate(`/models/${modelId}`);
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleEditAvatar = () => {
    navigate('/profile/avatar');
  };

  const handleCreateModel = () => {
    navigate('/models/create');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadProfileData}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          user={user}
          onEditProfile={handleEditProfile}
          onEditAvatar={handleEditAvatar}
        />

        <ModelsList
          models={models}
          onModelClick={handleModelClick}
          onCreateModel={handleCreateModel}
        />
      </div>
    </div>
  );
};