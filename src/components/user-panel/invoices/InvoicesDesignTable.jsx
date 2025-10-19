import React from "react";
import { INVOICES_TABLE_HEADERS } from "@/constants/user-panel/invoices/InvoicesDesignConstants";

const InvoicesDesignTable = ({ invoices = [], error, onViewDetails }) => (
  <div>
    <div className="bg-white mt-20 shadow-sm rounded-[12px]">
      <div className="px-9 py-10 border-b border-gray-200">
        <h1 className="text-[16px] font-bold text-gray-700">
          لیست سفارشات شما
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {INVOICES_TABLE_HEADERS.map((header) => (
                <th
                  key={header.key}
                  className="px-10 py-5 text-right text-[14px] font-medium text-black"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan="5" className="px-9 py-6 text-center text-red-500">
                  خطا در بارگذاری اطلاعات: {error}
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-9 py-6 text-center text-gray-500">
                  هیچ فاکتوری یافت نشد
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b border-gray-200 bg-gray-50"
                >
                  <td className="px-9 py-6 text-right">
                    <span className="text-[15px] font-normal text-gray-900">
                      #{invoice.orderNumber || invoice._id}
                    </span>
                  </td>
                  <td className="px-9 py-6">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-[8px] rounded-lg text-[12px] font-normal min-w-[110px] ${invoice.statusBadgeColor}`}
                    >
                      {invoice.paymentStatus}
                    </span>
                  </td>
                  <td className="px-9 py-6 text-right">
                    <span className="text-[15px] font-normal text-gray-600">
                      {invoice.formattedDate}
                    </span>
                  </td>
                  <td className="px-9 py-6 text-right">
                    <span className="text-[15px] font-semibold text-gray-600">
                      {invoice.formattedAmount} تومان
                    </span>
                  </td>
                  <td className="pl-[1px] pr-9 py-6">
                    <button
                      onClick={() => onViewDetails && onViewDetails(invoice)}
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded-lg text-[12px] font-medium"
                      type="button"
                    >
                      مشاهده جزئیات
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="h-6"></div>
    </div>
  </div>
);

export default InvoicesDesignTable;
