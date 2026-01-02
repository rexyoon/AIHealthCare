// src/pages/ai/AiChat.js
import React from 'react';
import OpenAIChat from '../../component/ai_explore/OpenAIChat'; // OpenAIChat 컴포넌트 경로 확인

const AiChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h1 className="text-2xl text-white">AI CHAT</h1>
      <OpenAIChat /> {/* OpenAIChat 컴포넌트 사용 */}
    </div>
  );
};

export default AiChat;
