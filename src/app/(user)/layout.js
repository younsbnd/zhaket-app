"use client";

import UserHeaderMobile from '@/components/layout/user-layout/header/mobileheader/UserHeaderMobile';
import UserHeader from '@/components/layout/user-layout/header/UserHeader';
import MobileSidebar from '@/components/layout/user-layout/sidebar/sidebarmobile/UserSidebarMobile';
import UserSidebar from '@/components/layout/user-layout/sidebar/UserSidebar';
import { useState } from 'react';

const PanelLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden lg:block">
        <UserHeader />
      </div>

      {/* Mobile Header - Hidden on desktop */}
      <div className="block lg:hidden">
        <UserHeaderMobile onMenuToggle={toggleMobileSidebar} />
      </div>

      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <UserSidebar />
        </div>

        {/* Mobile Sidebar - Hidden on desktop */}
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:mr-[350px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PanelLayout;
