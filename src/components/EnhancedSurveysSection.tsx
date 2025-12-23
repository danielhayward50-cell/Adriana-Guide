import React from 'react';

export const EnhancedSurveysSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Surveys</h2>
        <p className="text-gray-700 mb-6">
          Share your opinion and see what others think.
        </p>
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Survey Question {item}
              </h3>
              <div className="space-y-2">
                {['Option A', 'Option B', 'Option C', 'Option D'].map((option, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input type="radio" name={`survey-${item}`} className="text-blue-900" />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-2 rounded">
                Submit Vote
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
