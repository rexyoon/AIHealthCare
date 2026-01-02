import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import CheckIn from "../pages/CheckIn/CheckIn";
import Result from "../pages/Result/Result";
import History from "../pages/History/History";
import AiChat from "../pages/ai/aichat"; // 경로를 수정하여 AiChat 컴포넌트를 가져옵니다.

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/checkin" element={<CheckIn />} />
      <Route path="/result" element={<Result />} />
      <Route path="/history" element={<History />} />
      <Route path="/ai/aichat" element={<AiChat />} /> {/* AI 채팅 페이지 추가 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
