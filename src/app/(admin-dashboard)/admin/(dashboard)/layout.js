import React from "react";

const DashboardLayout = ({ children, orders, stats, quickStats }) => {
  return (
    <div className="space-y-6">
      {quickStats}
      {stats}
      {orders}
      {children}
    </div>
  );
};

export default DashboardLayout;

