import React, { useState } from 'react';
import api from '../../libs/axios'; // axios 설정 파일 경로

const OpenAIChat = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 form 제출 방지
    try {
      const res = await api.post('/api/openai/query', { query: userInput });
      setResponse(res.data); // 서버 응답 처리
    } catch (error) {
      console.error('OpenAI 요청 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="질문을 입력하세요"
      />
      <button type="submit">전송</button>
      <div>{response}</div>
    </form>
  );
};

export default OpenAIChat;
