import React from 'react';

export const EnhancedNewsHub: React.FC = () => {
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">News Hub</h2>
        <p className="text-gray-700 mb-6">
          Stay updated with the latest news from Colombia and around the world.
        </p>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <article key={item} className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                News Article {item}
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Pellentesque habitant morbi tristique senectus et netus.
              </p>
              <span className="text-sm text-gray-500 mt-2 inline-block">
                Published 2 hours ago
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
