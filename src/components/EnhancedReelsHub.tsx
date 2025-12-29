import React, { useState, useEffect } from 'react';
import { commentStore } from '../store/commentStore';

interface Reel {
  id: number;
  title: string;
  creator: string;
  thumbnail: string;
  views: string;
  category: string;
}

const mockReels: Reel[] = [
  { id: 1, title: 'Gustavo Petro Policy Analysis', creator: 'PoliticsCO', thumbnail: '🏛️', views: '245K', category: 'Politics' },
  { id: 2, title: 'Colombia Crime Rate Trends 2024', creator: 'DataColombia', thumbnail: '📊', views: '189K', category: 'Crime' },
  { id: 3, title: 'Trump Latin America Relations', creator: 'GlobalPolitics', thumbnail: '🌎', views: '312K', category: 'Politics' },
  { id: 4, title: 'Colombian Employment Report', creator: 'EconWatch', thumbnail: '💼', views: '156K', category: 'Employment' },
  { id: 5, title: 'Healthcare System Updates', creator: 'SaludCO', thumbnail: '🏥', views: '203K', category: 'Health' },
  { id: 6, title: 'National Security & Terror Threats', creator: 'SecurityNews', thumbnail: '🛡️', views: '276K', category: 'Security' },
  { id: 7, title: 'Presidential Poll Results', creator: 'EncuestasCO', thumbnail: '📈', views: '198K', category: 'Polls' },
  { id: 8, title: 'Wealth Distribution in Colombia', creator: 'EconomiaCO', thumbnail: '💰', views: '167K', category: 'Economy' },
  { id: 9, title: 'Political Debate Highlights', creator: 'DebatesCO', thumbnail: '🎙️', views: '221K', category: 'Politics' },
  { id: 10, title: 'Petro vs Opposition Analysis', creator: 'PoliticosCO', thumbnail: '⚖️', views: '289K', category: 'Politics' },
  { id: 11, title: 'Crime Prevention Strategies', creator: 'SeguridadCO', thumbnail: '🚔', views: '178K', category: 'Crime' },
  { id: 12, title: 'Job Market Analysis 2024', creator: 'EmpleosCO', thumbnail: '📋', views: '145K', category: 'Employment' },
];

export const EnhancedReelsHub: React.FC = () => {
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [reelComments, setReelComments] = useState<any[]>([]);
  const [showComments, setShowComments] = useState(false);

  const categories = ['all', 'Politics', 'Crime', 'Security', 'Employment', 'Health', 'Economy', 'Polls'];
  
  const filteredReels = filter === 'all' 
    ? mockReels 
    : mockReels.filter(reel => reel.category === filter);

  // Subscribe to comment updates
  useEffect(() => {
    const unsubscribe = commentStore.subscribe(() => {
      if (selectedReel) {
        setReelComments(commentStore.getCommentsBySource('reel', selectedReel.id));
      }
    });
    return unsubscribe;
  }, [selectedReel]);

  // Load comments when reel opens
  useEffect(() => {
    if (selectedReel) {
      setReelComments(commentStore.getCommentsBySource('reel', selectedReel.id));
    }
  }, [selectedReel]);

  const openReel = (reel: Reel) => {
    setSelectedReel(reel);
    setShowComments(false);
    setCommentText('');
    setAuthorName('');
  };

  const closeReel = () => {
    setSelectedReel(null);
    setShowComments(false);
  };

  const handleAddComment = () => {
    if (!selectedReel || !commentText.trim() || !authorName.trim()) return;
    
    commentStore.addComment({
      author: authorName.trim(),
      content: commentText.trim(),
      sourceType: 'reel',
      sourceId: selectedReel.id,
      sourceTitle: selectedReel.title,
    });

    setCommentText('');
    setAuthorName('');
    setShowComments(true);
  };

  const handleShareToCommunity = () => {
    if (!selectedReel) return;
    
    commentStore.addComment({
      author: 'You',
      content: `Check out this reel: "${selectedReel.title}" by @${selectedReel.creator}`,
      sourceType: 'reel',
      sourceId: selectedReel.id,
      sourceTitle: selectedReel.title,
    });

    alert('Shared to Community Hub! Check the Community section to see your post.');
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Political & Social Reels</h2>
        <p className="text-gray-700 mb-6">
          Stay informed on Colombian politics, crime, employment, health, and social issues.
        </p>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                filter === category
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? '🌟 All' : category}
            </button>
          ))}
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredReels.map((reel) => (
            <div 
              key={reel.id} 
              className="bg-gradient-to-br from-red-600 to-blue-900 rounded-lg p-6 aspect-video flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg"
              onClick={() => openReel(reel)}
            >
              <div className="text-6xl mb-3">{reel.thumbnail}</div>
              <h3 className="text-white font-bold text-center mb-1">{reel.title}</h3>
              <p className="text-white text-sm opacity-90">@{reel.creator}</p>
              <div className="mt-2 flex items-center gap-2 text-white text-sm">
                <span>👁️ {reel.views} views</span>
                <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
                  {reel.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredReels.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No reels found in this category.
          </div>
        )}
      </section>

      {/* Reel Viewer Modal */}
      {selectedReel && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={closeReel}>
          <div className="bg-white rounded-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Video Player Area */}
            <div className="bg-gradient-to-br from-red-600 to-blue-900 aspect-video rounded-t-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-8xl mb-4">{selectedReel.thumbnail}</div>
                <div className="text-2xl font-bold">▶️</div>
                <p className="text-sm mt-2 opacity-75">Video player placeholder</p>
              </div>
            </div>

            {/* Reel Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-1">{selectedReel.title}</h3>
                  <p className="text-gray-600">by @{selectedReel.creator}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>👁️ {selectedReel.views} views</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold">
                      {selectedReel.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeReel}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-6">
                {!showComments ? (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowComments(true)}
                      className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 font-semibold transition-colors"
                    >
                      💬 Comment
                    </button>
                    <button 
                      onClick={handleShareToCommunity}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors"
                    >
                      📤 Share to Community
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-blue-900">💬 Comments ({reelComments.length})</h3>
                      <button 
                        onClick={() => setShowComments(false)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        ← Back
                      </button>
                    </div>

                    {/* Add Comment Form */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts on this reel..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddComment}
                          disabled={!commentText.trim() || !authorName.trim()}
                          className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Post Comment
                        </button>
                        <button 
                          onClick={handleShareToCommunity}
                          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-semibold transition-colors"
                        >
                          📤 Share
                        </button>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {reelComments.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                      ) : (
                        reelComments.map((comment) => (
                          <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-blue-900">{comment.author}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(comment.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                            <div className="mt-2 flex gap-4 text-sm">
                              <button 
                                onClick={() => commentStore.likeComment(comment.id, commentStore.getCurrentUser() || 'Guest')}
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                              >
                                👍 Like ({comment.likes})
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
