import React, { useState, useEffect } from 'react';
import { commentStore, Notification } from '../store/commentStore';

interface NotificationsPanelProps {
  username: string;
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ username, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const updateNotifications = () => {
      setNotifications(commentStore.getNotifications(username));
    };

    updateNotifications();
    const unsubscribe = commentStore.subscribe(updateNotifications);
    return unsubscribe;
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reply':
        return '💬';
      case 'like':
        return '👍';
      case 'mention':
        return '@';
      default:
        return '🔔';
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    commentStore.markNotificationAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    commentStore.markAllNotificationsAsRead(username);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-900">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600">{unreadCount} unread</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-900 hover:underline"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <p className="text-gray-600">No notifications yet</p>
              <p className="text-sm text-gray-500 mt-2">You'll be notified when someone replies to your comments or likes them</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
                    notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-blue-900">{notification.fromUser}</span>
                        <span className="text-xs text-gray-500">{getTimeAgo(notification.timestamp)}</span>
                      </div>
                      <p className="text-gray-700">{notification.content}</p>
                      {!notification.read && (
                        <span className="inline-block mt-2 text-xs text-blue-900 font-semibold">
                          • New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
