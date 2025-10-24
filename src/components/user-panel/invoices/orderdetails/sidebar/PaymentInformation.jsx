"use client";
import React from "react";
import { getStatusInfo } from "@/constants/user-panel/invoices/InvoicesDesignConstants";
import PayerInformation from "./PayerInformation";

const PaymentInformation = ({ order }) => {
  // Format date without time
  const formatDate = (dateString) => {
    const date = new Date(dateString || new Date());
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format price
  const formatPrice = (price) => {
    return price ? price.toLocaleString("fa-IR") : "۱٬۱۰۰٬۰۰۰";
  };

  const statusInfo = getStatusInfo(order?.status);

  return (
    <div className="text-right bg-gray-10 opacity-80 w-full max-w-[520px] mx-auto rounded-lg p-3 sm:p-4 md:p-5">
      <div className="text-right w-full max-w-[420px] mx-auto text-gray-500 bg-gray-50 rounded-lg p-3 sm:p-4 md:p-5 space-y-4 sm:space-y-5 md:space-y-6">
        {/* User Information Section - Now separate component */}
        <PayerInformation order={order} />
        <div className="text-right bg-gray-50 space-y-3 sm:space-y-4 py-2 sm:py-3 px-3 sm:px-4 rounded-lg grid grid-cols-1 gap-2 sm:gap-3">
          <div className="text-right flex flex-row justify-between items-center">
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700">وضعیت سفارش</p>
            <div className="text-gray-800">
              <div
                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-center text-xs sm:text-sm justify-center rounded-lg flex items-center ${statusInfo.color}`}
              >
                {statusInfo.text}
              </div>
            </div>
          </div>
          <div className="text-right bg-transparent flex flex-row justify-between items-center">
            <p className="text-sm text-gray-600 leading-5 sm:leading-6">تاریخ</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-900 leading-5 sm:leading-6">
              {formatDate(order?.paymentResult?.paidAt)}
            </p>
          </div>
          <div className="text-right bg-transparent flex flex-row justify-between items-center">
            <p className="text-sm md:text-base text-gray-600 leading-5 sm:leading-6 tracking-tighter">
              کد سفارش
            </p>
            <p className="text-sm md:text-base text-gray-900 leading-5 sm:leading-6 tracking-tighter">
              {order?.orderNumber || order?._id?.slice(-6) || "930588"}
            </p>
          </div>
          <div className="text-right bg-transparent flex flex-row justify-between items-center">
            <p className="text-sm md:text-base text-gray-600 leading-5 sm:leading-6 tracking-tighter">
              کد رهگیری
            </p>
            <p className="text-sm md:text-base text-gray-900 leading-5 sm:leading-6 tracking-tighter">
              {order?.paymentResult?.refId ||
                order?.paymentResult?.authority ||
                order?._id?.slice(-6) ||
                "217761"}
            </p>
          </div>
          <div className="text-right bg-transparent flex flex-row justify-between items-center">
            <p className="text-xs md:text-sm text-gray-600 leading-5 sm:leading-6 tracking-tighter">
              مجموع پرداختی
            </p>
            <p className="text-sm md:text-base text-gray-900 leading-5 sm:leading-6 tracking-tighter">
              {formatPrice(order?.totalPrice)}&nbsp;
              <span className="text-sm">تومان</span>
            </p>
          </div>
          <div className="text-right bg-transparent flex flex-row justify-between items-center">
            <p className="text-sm md:text-base text-gray-600 leading-5 sm:leading-6 tracking-tighter">
              مبلغ کل
            </p>
            <p className="text-sm md:text-base text-gray-900 leading-5 sm:leading-6 tracking-tighter">
              {formatPrice(order?.totalPrice)}&nbsp;
              <span className="text-xs sm:text-sm">تومان</span>
            </p>
          </div>
          <button
            className={`inline-flex items-center justify-center gap-2 w-full h-10 sm:h-11 md:h-12 rounded-md px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base cursor-pointer transition-colors duration-200  ${statusInfo.buttonColor}`}
            type="button"
            aria-label={statusInfo.button}
          >
            {statusInfo.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
