import React from "react";
import AdminSidebarLogo from "./AdminSidebarLogo";
import AdminNavLinks from "./AdminNavLinks";

// admin sidebar for desktop devices
const AdminSidebar = () => {
  return (
    <aside
      id="sidebar"
      className=" right-0 top-0 z-30 w-90 translate-x-0 glass border-l border-slate-800/60 transition-transform xl:translate-x-0 hidden xl:block text-[.7rem] h-screen"
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <AdminSidebarLogo />
      </div>
      <AdminNavLinks />
    </aside>
  );
};

export default AdminSidebar;
