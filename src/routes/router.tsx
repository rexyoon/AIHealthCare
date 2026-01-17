import AiChat from "@/pages/ai/aichat";
import CheckIn from "@/pages/CheckIn/CheckIn";
import History from "@/pages/History/History";
import Result from "@/pages/Result/Result";
import { Navigate, Route, Routes } from "react-router-dom";
import HealthcareHome from "@/pages/HealthcareHome";

export default function AppRouter() {
  return (
    <Routes>

      <Route path="/checkin" element={<CheckIn />} />
      <Route path="/result" element={<Result />} />
      <Route path="/history" element={<History />} />
      <Route path="/ai/aichat" element={<AiChat />} /> {/* AI 채팅 페이지 추가 */}
      <Route path="/" element={<HealthcareHome />} />  
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
