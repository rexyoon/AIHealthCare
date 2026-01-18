import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import IronHome from "@/image/Ironhome.png"; // 경로 맞게 수정

export default function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      {/* ✅ 여기서부터: 기존 "AI Fitness Coach / Daily" 임시 헤더를 교체한 전역 헤더 */}
      <header className="sticky top-0 z-10 w-full h-14 bg-black border-b border-zinc-800">
        {/* 좌/우 영역 */}
        <div className="h-full flex items-center justify-between px-4">
          {/* Left: Hamburger */}
          <button aria-label="menu" className="flex flex-col gap-1.5">
            <span className="block w-6 h-0.5 bg-[#00ff4c]" />
            <span className="block w-6 h-0.5 bg-[#00ff4c]" />
            <span className="block w-6 h-0.5 bg-[#00ff4c]" />
          </button>

          {/* Right: User */}
          <button aria-label="profile">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00ff4c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21c1.5-4 11.5-4 13 0" />
            </svg>
          </button>
        </div>

        {/* Center: Home Logo */}
        <button
          onClick={() => navigate("/")}
          aria-label="go home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <img src={IronHome} alt="Iron Home" className="h-7 object-contain" />
        </button>
      </header>
      {/* ✅ 여기까지가 헤더 */}

      {/* ✅ 메인 콘텐츠 */}
      <main className="mx-auto max-w-md px-4 pb-20 pt-4">{children}</main>

      {/* ✅ 하단 네비 */}
      <BottomNav />
    </div>
  );
}
