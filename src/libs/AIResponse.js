// AIResponse.js
import React from 'react';

const AIResponse = ({ response }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">AI COACH</h2>
      <div className="mt-2">
        {response}
      </div>
    </div>
  );
};

export default AIResponse;
