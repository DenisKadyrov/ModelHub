import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProfileHeader } from '../components/ProfileHeader';
import { ModelsList } from '../components/ModelsList';
import { Loading } from '../components/Loading';
import { ErrorComp } from '../components/ErrorComp';

import type { UserData } from '../types/users';

import { me } from '../api/users';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      const profileData = await me();

      setUserData(profileData);
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

  const handleCreateModel = () => {
    navigate('/model/create');
  };

  if (loading) {
    return <Loading />;

  }
  if (error) {
    return <ErrorComp error={error} onClick={loadProfileData} />;
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          user={userData}
          onEditProfile={handleEditProfile}
        />

        <ModelsList
          models={userData.models}
          onModelClick={handleModelClick}
          onCreateModel={handleCreateModel}
        />
      </div>
    </div>
  );
};