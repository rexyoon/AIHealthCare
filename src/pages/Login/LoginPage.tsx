import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-dvh bg-black text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b border-zinc-800 bg-black">
        <div className="flex h-14 items-center justify-between px-4">
          {/* Left: Hamburger */}
          <button
            type="button"
            aria-label="menu"
            className="flex flex-col gap-1.5"
          >
            <span className="block h-0.5 w-6 bg-[#39FF14]" />
            <span className="block h-0.5 w-6 bg-[#39FF14]" />
            <span className="block h-0.5 w-6 bg-[#39FF14]" />
          </button>

          {/* Center: Logo */}
          <div className="flex flex-col items-center leading-none">
            <div className="flex items-center gap-2">
              {/* simple neon mark */}
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#39FF14] shadow-[0_0_10px_rgba(57,255,20,0.55)]" />
              <span className="text-xs font-semibold text-[#39FF14] drop-shadow-[0_0_10px_rgba(57,255,20,0.45)]">
                AI Coach
              </span>
            </div>
            <span className="text-xs font-bold text-[#39FF14] drop-shadow-[0_0_10px_rgba(57,255,20,0.45)]">
              Iron Logic
            </span>
          </div>

          {/* Right: User icon */}
          <button type="button" aria-label="profile" className="p-1">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#39FF14] drop-shadow-[0_0_10px_rgba(57,255,20,0.45)]"
            >
              <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 21a8 8 0 0 0-16 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto flex min-h-[calc(100dvh-56px)] w-full max-w-[380px] flex-col px-5">
        {/* Spacer to match screenshot vertical placement */}
        <div className="h-24" />

        <div className="flex flex-col gap-4">
          {/* Username */}
          <label className="sr-only" htmlFor="username">
            닉네임
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="닉네임"
            className="h-14 w-full rounded-2xl border border-[#39FF14]/70 bg-[#1b2a10] px-4 text-[15px] text-zinc-100 outline-none placeholder:text-zinc-300/70 shadow-[0_0_0_1px_rgba(57,255,20,0.18)] focus:border-[#39FF14] focus:shadow-[0_0_18px_rgba(57,255,20,0.22)]"
          />

          {/* Password */}
          <label className="sr-only" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="h-14 w-full rounded-2xl border border-[#39FF14]/70 bg-[#1b2a10] px-4 text-[15px] text-zinc-100 outline-none placeholder:text-zinc-300/70 shadow-[0_0_0_1px_rgba(57,255,20,0.18)] focus:border-[#39FF14] focus:shadow-[0_0_18px_rgba(57,255,20,0.22)]"
          />

          {/* Login Button */}
          <button
            type="button"
            className="h-14 w-full rounded-2xl bg-[#39FF14] font-semibold text-black shadow-[0_8px_24px_rgba(57,255,20,0.20)] active:translate-y-[1px]"
          >
            로그인
          </button>
        </div>

        {/* Bottom divider line like screenshot */}
        <div className="mt-auto pb-6">
          <div className="mt-10 h-px w-full bg-zinc-800" />
        </div>
      </main>
    </div>
  );
}
