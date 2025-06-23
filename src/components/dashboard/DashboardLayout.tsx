import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu, ChevronRight } from 'lucide-react';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-pastel-mint">
      {/* Sidebar: responsive, overlays on mobile, always visible on desktop */}
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      {/* Removed expand button from layout; Sidebar handles expand/collapse */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with hamburger for mobile */}
        <div className="md:hidden flex items-center p-4 bg-white shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-gray-100"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-xl font-bold">TechAdmirers</h1>
        </div>
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
