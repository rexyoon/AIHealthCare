import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import IronHome from "@/image/Ironhome.png"; // 경로 맞게 수정
import Sidebar from "../ui/Sidebar";

export default function Layout({children}:{children: ReactNode}) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <header className="sticky top-0 z-10 w-full h-14 bg-black border-b border-zinc-800">
             <div className="h-full flex items-center justify-between px-4">
              <button aria-label="menu" className="flex flex-col gap-1.5" onClick={() => setIsSidebarOpen(true)}>
              <span className="block w-6 h-0.5 bg-[#00ff4c]" />
              <span className="block w-6 h-0.5 bg-[#00ff4c]" />
              <span className="block w-6 h-0.5 bg-[#00ff4c]" />
              </button>

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
<button
          onClick={() => navigate("/")}
          aria-label="go home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src={IronHome} alt="Iron Home" className="h-7 object-contain" />
        </button>
          </header>
          <main className="mx-auto max-w-md px-4 pb-20">{children}</main>

          <BottomNav />
    </div>
  );
}