import React, { useState } from 'react';

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

  const categories = ['all', 'Politics', 'Crime', 'Security', 'Employment', 'Health', 'Economy', 'Polls'];
  
  const filteredReels = filter === 'all' 
    ? mockReels 
    : mockReels.filter(reel => reel.category === filter);

  const openReel = (reel: Reel) => {
    setSelectedReel(reel);
  };

  const closeReel = () => {
    setSelectedReel(null);
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
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 font-semibold transition-colors">
                  ❤️ Like
                </button>
                <button className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 font-semibold transition-colors">
                  💬 Comment
                </button>
                <button className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors">
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
