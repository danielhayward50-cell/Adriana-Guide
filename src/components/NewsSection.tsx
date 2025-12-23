import React from 'react';

const NewsSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-900">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <article key={item} className="bg-white rounded-lg shadow-md p-4">
            <div className="bg-gray-200 rounded h-40 mb-3 flex items-center justify-center">
              <span className="text-gray-500">Image {item}</span>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              News Headline {item}
            </h3>
            <p className="text-gray-600 text-sm">
              Brief description of the news article goes here...
            </p>
            <button className="mt-3 text-blue-900 hover:text-blue-700 font-semibold text-sm">
              Read More →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
