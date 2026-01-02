import { Navigate, Route, Routes } from "react-router-dom";


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
