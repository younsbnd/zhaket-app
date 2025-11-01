"use client";

import React from "react";

// AdminEmptyMessages is a component that shows a message when there are no messages
const AdminEmptyMessages = () => {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="text-center text-white/50">
        <p className="text-lg">هنوز پیامی ارسال نشده است</p>
      </div>
    </div>
  );
};

export default AdminEmptyMessages;
