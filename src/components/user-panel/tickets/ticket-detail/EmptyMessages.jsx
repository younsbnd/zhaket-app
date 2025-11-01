import React from "react";
import { FiMessageSquare } from "react-icons/fi";

// empty messages for ticket detail page
const EmptyMessages = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-3">
        <FiMessageSquare className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto" />
        <p className="text-gray-500 text-sm md:text-base">
          هنوز پیامی ثبت نشده است
        </p>
      </div>
    </div>
  );
};

export default EmptyMessages;
