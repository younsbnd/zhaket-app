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
      <p className='text-gray-700 text-lg font-medium'>
        لطفا منتظر بمانید
        <span className='dots'></span>
      </p>

      {/* Optional: soft hint */}
      <p className='text-sm text-gray-500 mt-1'>در حال بارگذاری اطلاعات...</p>

      <style jsx>{`
        .dots::after {
          content: "";
          display: inline-block;
          animation: dots 1.5s steps(4, end) infinite;
        }
        @keyframes dots {
          0% {
            content: "";
          }
          25% {
            content: ".";
          }
          50% {
            content: "..";
          }
          75% {
            content: "...";
          }
          100% {
            content: "";
          }
        }
      `}</style>
    </div>
  );
}
