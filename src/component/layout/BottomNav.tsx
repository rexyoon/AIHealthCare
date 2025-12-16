import { NavLink } from "react-router-dom";

const base = "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs";
const on = "text-lime-400";
const off = "text-zinc-400";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-md px-2">
        <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? on : off}`}>
          <span className="text-base">🏠</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/checkin" className={({ isActive }) => `${base} ${isActive ? on : off}`}>
          <span className="text-base">📝</span>
          <span>Check-in</span>
        </NavLink>
        <NavLink to="/result" className={({ isActive }) => `${base} ${isActive ? on : off}`}>
          <span className="text-base">⚡</span>
          <span>Result</span>
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `${base} ${isActive ? on : off}`}>
          <span className="text-base">📈</span>
          <span>History</span>
        </NavLink>
      </div>
    </nav>
  );
}
