import React from 'react';

const CommunityHub: React.FC = () => {
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Community Hub</h2>
        <p className="text-gray-700 mb-6">
          Connect with fellow Colombians and share your experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <h3 className="text-xl font-semibold text-blue-900 mb-3">Recent Posts</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                    U{item}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900">User {item}</h4>
                    <p className="text-gray-700 mt-1">
                      This is a sample community post. Join the discussion!
                    </p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <button className="hover:text-blue-900">Like</button>
                      <button className="hover:text-blue-900">Comment</button>
                      <button className="hover:text-blue-900">Share</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityHub;
