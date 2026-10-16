import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const DashboardLayout = ({ children, searchQuery, setSearchQuery }) => {
  const { currentUser, navigateTo } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Protected route guard: if no user is authenticated, redirect
  if (!currentUser) {
    navigateTo('login');
    return null;
  }

  return (
    <div className="dashboard-layout">
      <div className="app-background-mesh" />

      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="dashboard-main">
        <Navbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};
