// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter'; // 라우터 파일 경로 확인

const App = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default App;
