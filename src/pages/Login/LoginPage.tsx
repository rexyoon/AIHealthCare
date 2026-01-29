import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-dvh bg-black text-zinc-100">
    

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
