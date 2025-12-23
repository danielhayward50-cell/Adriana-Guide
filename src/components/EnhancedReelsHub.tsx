import React from 'react';

export const EnhancedReelsHub: React.FC = () => {
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Reels Hub</h2>
        <p className="text-gray-700">
          Discover trending Colombian content and culture through engaging video reels.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center">
              <span className="text-gray-500">Reel {item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
