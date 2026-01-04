import React from 'react';
import OpenAIChat from '../../component/ai_explore/OpenAIChat'; 
const AiChat: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <h1 className="text-2xl text-white mb-4">AI CHAT</h1>
      <OpenAIChat />
    </div>
  );
};
export default AiChat;
