// src/components/layouts/Layout.jsx - Fixed Layout with Proper State Management
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

const Layout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Handle hamburger click from mobile bottom nav
  const handleMobileHamburgerClick = () => {
    setMobileSidebarOpen(true);
  };

  // Handle closing mobile sidebar
  const handleCloseMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-black)]">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-orange)] opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-text-4)] opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-text-5)] opacity-5 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with mobile sidebar state props */}
        <Header
          onMobileSidebarToggle={handleMobileHamburgerClick}
          isMobileSidebarOpen={mobileSidebarOpen}
          onCloseMobileSidebar={handleCloseMobileSidebar}
        />

        {/* Main content area - add padding bottom on mobile for bottom nav */}
        <main className="flex-1 pb-16 lg:pb-0">
          <Outlet />
        </main>

        {/* Footer - Always visible on desktop, hidden behind bottom nav on mobile */}
        <div className="lg:block">
          <Footer />
        </div>

        {/* Mobile Bottom Navigation - Only visible on mobile */}
        <MobileBottomNav onHamburgerClick={handleMobileHamburgerClick} />
      </div>
    </div>
  );
};

export default Layout;
