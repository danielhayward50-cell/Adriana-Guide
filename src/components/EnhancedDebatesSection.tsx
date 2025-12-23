import React from 'react';

export const EnhancedDebatesSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Debates</h2>
        <p className="text-gray-700 mb-6">
          Join the conversation on important topics affecting Colombia.
        </p>
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Debate Topic {item}
              </h3>
              <p className="text-gray-600 mb-4">
                What are your thoughts on this important issue?
              </p>
              <div className="flex gap-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                  Agree
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  Disagree
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
