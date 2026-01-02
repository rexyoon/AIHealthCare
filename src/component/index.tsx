
// pages/index.tsx
import React from 'react';
import OpenAIChat from '../component/ai_explore/OpenAIChat';

const Home: React.FC = () => {
  return (
    <div>
      <h1>OpenAI와 대화하기</h1>
      <OpenAIChat />
    </div>
  );
};

export default Home;
