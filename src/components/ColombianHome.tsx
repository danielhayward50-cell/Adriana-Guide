import React from 'react';

type Section = 'home' | 'reels' | 'news' | 'debates' | 'surveys' | 'tendencies' | 'community';

interface ColombianHomeProps {
  onNavigate: (section: Section) => void;
}

export const ColombianHome: React.FC<ColombianHomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          Welcome to Adriana Guide
        </h2>
        <p className="text-gray-700 mb-6">
          Your comprehensive guide to Colombian culture, news, and community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('reels')}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            Explore Reels
          </button>
          <button
            onClick={() => onNavigate('news')}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            Read News
          </button>
          <button
            onClick={() => onNavigate('community')}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            Join Community
          </button>
        </div>
      </section>
    </div>
  );
};
