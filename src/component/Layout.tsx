// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './SideBar';
import { useState } from 'react';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={() => setIsSidebarOpen(false)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 헤더 높이만큼 여백 주기 */}
      <main className="px-4 pt-16">
        <Outlet />
      </main>
    </div>
  );
}
