"use client";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

export default function LoadingMessage() {
  return (
    <div className='flex flex-col items-center justify-center py-10 text-center'>
      {/* Spinner Icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
        <FaSpinner className='text-black text-4xl mb-3' />
      </motion.div>

      {/* Message */}
      <div className='text-gray-700 text-lg font-medium'>
        لطفا منتظر بمانید
        <span className='inline-block w-4 overflow-hidden align-bottom'>
          <span className='animate-[dots_1.5s_steps(4,end)_infinite]'>
            ....
          </span>
        </span>
      </div>

      {/* Optional: soft hint */}
      <p className='text-sm text-gray-500 mt-1'>در حال بارگذاری اطلاعات...</p>
    </div>
  );
}
