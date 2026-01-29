import AiChat from "@/pages/ai/aichat";
import CheckIn from "@/pages/CheckIn/CheckIn";
import Result from "@/pages/Result/Result";
import { Navigate, Route, Routes } from "react-router-dom";
import HealthcareHome from "@/pages/HealthcareHome";
import HealthMetricsDashboard from "@/pages/Dashboard/HealthMetricsDashboard";
import HealthHistoryPage from "@/pages/Dashboard/HealthHistoryPage";
import LoginPage from "@/pages/Login/LoginPage";
import WeightGraph from "@/pages/Result/WeightGraph";

export default function AppRouter() {
  return (
    <Routes>

      <Route path="/checkin" element={<CheckIn />} />
      <Route path="/result" element={<Result />} />
      <Route path="/ai/aichat" element={<AiChat />} /> {/* AI 채팅 페이지 추가 */}
      <Route path="/" element={<HealthcareHome />} />  
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/health/history" element={<HealthHistoryPage />} />
      <Route path="/health/dashboard/:date" element={<HealthMetricsDashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/result/weight-graph" element={<WeightGraph />} />
    </Routes>
  );
}
