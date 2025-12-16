import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <div className="font-extrabold tracking-tight">
            <span className="text-lime-400">AI</span> Fitness Coach
          </div>
          <div className="text-xs text-zinc-400">Daily</div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 pb-20 pt-4">{children}</main>

      <BottomNav />
    </div>
  );
}
