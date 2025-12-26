import React, { useState, useEffect } from 'react';
import { commentStore, Comment } from '../store/commentStore';

const CommunityHub: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<'all' | 'article' | 'reel'>('all');

  // Subscribe to comment updates
  useEffect(() => {
    const updateComments = () => {
      setComments(commentStore.getComments());
    };
    
    updateComments(); // Initial load
    const unsubscribe = commentStore.subscribe(updateComments);
    return unsubscribe;
  }, []);

  const filteredComments = filter === 'all' 
    ? comments 
    : comments.filter(c => c.sourceType === filter);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

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

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Community Hub</h2>
        <p className="text-gray-700 mb-6">
          Connect with fellow Colombians and share your experiences. All comments from articles and reels appear here!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Forums</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">General Discussion</span>
                <span className="text-sm text-gray-500">234 posts</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Culture & Traditions</span>
                <span className="text-sm text-gray-500">189 posts</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Travel Tips</span>
                <span className="text-sm text-gray-500">156 posts</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Events</h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 rounded p-3">
                <h4 className="font-semibold text-blue-900">Cultural Festival</h4>
                <p className="text-sm text-gray-600">Next Saturday, 3:00 PM</p>
              </div>
              <div className="bg-yellow-50 rounded p-3">
                <h4 className="font-semibold text-blue-900">Community Meetup</h4>
                <p className="text-sm text-gray-600">Next Sunday, 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-blue-900">Activity Feed ({filteredComments.length})</h3>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filter === 'all'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('article')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filter === 'article'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📰 Articles
              </button>
              <button
                onClick={() => setFilter('reel')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filter === 'reel'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🎬 Reels
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredComments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg mb-2">No activity yet!</p>
                <p className="text-gray-400 text-sm">
                  Comments from News articles and Political Reels will appear here.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Visit the <strong>News</strong> or <strong>Reels</strong> section to start commenting!
                </p>
              </div>
            ) : (
              filteredComments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {getInitials(comment.author)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-blue-900">{comment.author}</h4>
                        <span className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          comment.sourceType === 'article' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {comment.sourceType === 'article' ? '📰 Article' : '🎬 Reel'}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.content}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">on:</span> {comment.sourceTitle}
                      </p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <button 
                          onClick={() => commentStore.likeComment(comment.id)}
                          className="hover:text-blue-900 transition-colors"
                        >
                          👍 Like ({comment.likes})
                        </button>
                        <button className="hover:text-blue-900 transition-colors">💬 Reply</button>
                        <button className="hover:text-blue-900 transition-colors">📤 Share</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityHub;
