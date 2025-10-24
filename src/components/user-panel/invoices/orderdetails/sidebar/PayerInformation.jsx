"use client";
import React from "react";
import Image from "next/image";
import { FaUser, FaPhone } from "react-icons/fa";

const PayerInformation = ({ order }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 w-full">
      <div className="text-right shadow-2xl shadow-gray-100 bg-white flex p-[7px] flex-row justify-between items-center gap-2">
        <div className="flex justify-center items-center">
          <p className="text-primary p-[4px] rounded-md bg-blue-100 text-[11px] sm:text-[13px] flex whitespace-nowrap">
            اطلاعات پرداخت کننده
          </p>
        </div>
        <Image
          className="w-[50px] sm:w-[50px] h-[50px] sm:h-[60px] object-contain flex-shrink-0"
          src="/images/user-panel/invoices/image.png"
          alt="saman"
          width={70}
          height={70}
        />
      </div>

      <div className="text-right grid grid-cols-1 gap-3 sm:gap-4 pr-1.5 bg-white">
        <div className="text-right flex flex-row items-center gap-2">
          <FaUser size={12} className="text-[#C1C3C8] flex-shrink-0" />
          <p className="text-sm text-gray-700 leading-7 truncate">
            {order?.user?.fullName || order?.user?.email || "کاربر ژاکت"}
          </p>
        </div>

        <div className="text-right flex flex-row items-center gap-2">
          <FaPhone size={16} className="text-[#C1C3C8] flex-shrink-0" />
          <p className="text-sm lg:text-base text-gray-700 leading-7 break-all">
            {order?.user?.phoneNumber || order?.user?.email || "989165831758"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayerInformation;
