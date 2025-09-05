import AdminHeader from "@/components/layout/admin/header/AdminHeader";
import AdminSidebar from "@/components/layout/admin/sidebar/AdminSidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="bg-[#000814] text-slate-100 min-h-screen selection:bg-blue-600/30 flex flex-col">
      <div className="flex">
        {/* sidebar */}
        <AdminSidebar />

        <div className="w-full flex flex-col">
          <div className="header w-full">
            {/* header */}
            <AdminHeader />
          </div>
          {/* content */}
          <div className="content max-w-7xl mx-auto w-full px-3 pt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
