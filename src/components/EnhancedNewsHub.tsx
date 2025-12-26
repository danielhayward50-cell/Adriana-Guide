import React, { useState } from 'react';

type NewsRegion = 'world' | 'south-america';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  region: NewsRegion;
  timestamp: string;
}

// Mock news data - in production, this would come from an API
const mockNews: NewsArticle[] = [
  // World News
  { id: 1, title: 'Global Climate Summit Concludes with New Agreements', description: 'World leaders reach historic agreement on climate action with commitments from over 150 countries.', region: 'world', timestamp: '2 hours ago' },
  { id: 2, title: 'Technology Giants Unveil AI Breakthrough', description: 'Major tech companies announce collaborative AI research initiative aimed at solving global challenges.', region: 'world', timestamp: '4 hours ago' },
  { id: 3, title: 'International Trade Deal Signed', description: 'New trade agreements promise to boost global economic cooperation and reduce tariffs.', region: 'world', timestamp: '6 hours ago' },
  { id: 4, title: 'Space Exploration Milestone Achieved', description: 'International space agencies celebrate successful joint mission to establish lunar research station.', region: 'world', timestamp: '8 hours ago' },
  { id: 5, title: 'Global Health Initiative Launches', description: 'WHO announces new program to improve healthcare access in developing nations.', region: 'world', timestamp: '10 hours ago' },
  
  // South American News
  { id: 6, title: 'Colombia Launches New Infrastructure Projects', description: 'Government announces major investment in roads, bridges, and public transportation across the country.', region: 'south-america', timestamp: '1 hour ago' },
  { id: 7, title: 'Amazon Rainforest Conservation Efforts Expand', description: 'Brazil and neighboring countries commit to expanded protection zones and sustainable development programs.', region: 'south-america', timestamp: '3 hours ago' },
  { id: 8, title: 'South American Trade Alliance Strengthens', description: 'Regional leaders meet to discuss economic cooperation and trade agreements across the continent.', region: 'south-america', timestamp: '5 hours ago' },
  { id: 9, title: 'Cultural Festival Celebrates Latin American Heritage', description: 'Major cities across South America host events showcasing music, art, and traditions.', region: 'south-america', timestamp: '7 hours ago' },
  { id: 10, title: 'Renewable Energy Projects Gain Momentum', description: 'Chile and Argentina lead the way with new solar and wind power initiatives across the region.', region: 'south-america', timestamp: '9 hours ago' },
];

export const EnhancedNewsHub: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<NewsRegion>('world');

  const filteredNews = mockNews.filter(article => article.region === activeRegion);

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">News Hub</h2>
        <p className="text-gray-700 mb-6">
          Stay updated with the latest news from around the world and South America.
        </p>

        {/* Region Toggle Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveRegion('world')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeRegion === 'world'
                ? 'bg-blue-900 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🌍 World News
          </button>
          <button
            onClick={() => setActiveRegion('south-america')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeRegion === 'south-america'
                ? 'bg-yellow-500 text-blue-900 shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🌎 South American News
          </button>
        </div>

        {/* News Articles */}
        <div className="space-y-4">
          {filteredNews.map((article) => (
            <article key={article.id} className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {article.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Published {article.timestamp}
                </span>
                <button className="text-blue-900 hover:text-blue-700 font-semibold text-sm">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No Results Message */}
        {filteredNews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No news articles available for this region.
          </div>
        )}
      </section>
    </div>
  );
};
