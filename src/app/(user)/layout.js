"use client";

import FooterUser from '@/components/layout/user-layout/footer/FooterUser';
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
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden lg:block">
        <UserHeader />
      </div>

      {/* Mobile Header - Hidden on desktop */}
      <div className="block lg:hidden">
        <UserHeaderMobile onMenuToggle={toggleMobileSidebar} />
      </div>

      <div className="flex flex-1">
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
          <div className="w-full max-w-[1279px] mx-auto px-4">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer - Responsive margin */}
      <div className="lg:mr-[340px] mb-8">
        <FooterUser />
      </div>
    </div>
  );
};

export default PanelLayout;
