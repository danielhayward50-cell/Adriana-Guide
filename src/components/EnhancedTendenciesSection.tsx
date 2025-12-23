import React from 'react';

export const EnhancedTendenciesSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Tendencies</h2>
        <p className="text-gray-700 mb-6">
          Explore what's trending in Colombian culture and society.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Politics', 'Entertainment', 'Sports', 'Technology',
            'Fashion', 'Food', 'Music', 'Travel'
          ].map((category, idx) => (
            <div key={idx} className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">#{category}</h3>
              <p className="text-blue-800">Trending now</p>
              <div className="mt-2 text-sm text-blue-800">
                {Math.floor(Math.random() * 10000)} posts
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
