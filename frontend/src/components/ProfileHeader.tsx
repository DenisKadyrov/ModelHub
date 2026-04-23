import type { FC } from 'react';
import type { UserData } from '../types/users';

interface ProfileHeaderProps {
  user: UserData;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  user,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <div className="text-3xl font-bold text-gray-500">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {user.name}
          </h1>

          <p className="text-gray-600 mb-2">{user.email}</p>
          <p className="text-sm text-gray-500">
            Joined {formatDate(user.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};
