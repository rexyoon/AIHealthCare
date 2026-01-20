type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-200",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={onClose}
        aria-hidden="true"/>
      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-dvh w-64 bg-black text-white border-r border-zinc-800",
          "transition-transform duration-200 ease-out will-change-transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="sidebar" >
        {/* Top bar */}
        <div className="h-14 flex items-center justify-start px-4 border-b border-zinc-800">
          <button
            onClick={onClose}
            aria-label="close sidebar"
            className="text-[#00ff4c] text-2xl leading-none">
            ×
          </button>
        </div>
        {/* Menu */}
        <nav className="py-3">
          <MenuItem
            label="AICOACH"
            onClick={() => {
              // TODO: 라우트 생기면 주석 해제
              // navigate("/aicoach");
              onClose();
            }} />
          <Divider />
          <MenuItem
            label="HealthChart"
            onClick={() => {
              // TODO: 라우트 생기면 주석 해제
              // navigate("/health-chart");
              onClose();
            }} />
          <Divider />
          <MenuItem
            label="Blood analyze"
            onClick={() => {
              // TODO: 라우트 생기면 주석 해제
              // navigate("/blood-analyze");
              onClose();
            }}/>
        </nav>
      </aside>
    </>
  );
}

function MenuItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-6 py-3 text-sm font-semibold tracking-wide hover:bg-zinc-900/60 transition">
      {label}
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-zinc-800" />;
}
