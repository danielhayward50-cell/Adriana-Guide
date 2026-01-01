import React, { useState, useEffect } from 'react';
import { commentStore, UserProfile as UserProfileType } from '../store/commentStore';

interface UserProfileProps {
  username: string;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, onClose }) => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [userComments, setUserComments] = useState<any[]>([]);

  useEffect(() => {
    const profileData = commentStore.getUserProfile(username);
    setProfile(profileData || null);
    
    const comments = commentStore.filterCommentsByUser(username);
    setUserComments(comments);
  }, [username]);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (!profile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900">User Profile</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600">Profile not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-900">User Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Profile Info */}
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl font-bold">
                {profile.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900">{profile.username}</h3>
                <p className="text-gray-600">Member since {new Date(profile.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-900">{profile.commentsCount}</div>
                <div className="text-sm text-gray-600">Comments</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-yellow-600">{profile.likesReceived}</div>
                <div className="text-sm text-gray-600">Likes Received</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{userComments.length}</div>
                <div className="text-sm text-gray-600">Active Comments</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {profile.recentActivity.slice(0, 10).map((activity, index) => (
                <div key={index} className="border-l-4 border-blue-900 pl-4 py-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-blue-900 capitalize">{activity.type}</span>
                      <p className="text-gray-700 text-sm mt-1">{activity.content}</p>
                    </div>
                    <span className="text-xs text-gray-500">{getTimeAgo(activity.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Comments */}
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-4">All Comments ({userComments.length})</h3>
            <div className="space-y-4">
              {userComments.map((comment) => (
                <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold flex-shrink-0">
                      {comment.author.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-600">
                          On: <span className="font-semibold">{comment.sourceTitle}</span>
                        </span>
                        <span className="text-xs text-gray-400">• {getTimeAgo(comment.timestamp)}</span>
                      </div>
                      <p className="text-gray-800">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600">
                          👍 {comment.likes} likes
                        </span>
                        {comment.replies && comment.replies.length > 0 && (
                          <span className="text-sm text-gray-600">
                            💬 {comment.replies.length} replies
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
