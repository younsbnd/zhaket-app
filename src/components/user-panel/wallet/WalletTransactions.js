"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import {
  FiCreditCard,
  FiArrowUpCircle,
  FiArrowDownCircle,
} from "react-icons/fi";

const WalletTransactions = ({
  transactions = [],
  isLoadingTransactions = false,
}) => {
  // Format number to Persian currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fa-IR").format(amount);
  };

  // Format date to Persian
  const formatDate = (dateString) => {
    if (!dateString) return "تاریخ نامشخص";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "تاریخ نامعتبر";
      }

      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      return "تاریخ نامعتبر";
    }
  };

  return (
    <Card className="shadow">
      <CardBody className="p-4 md:p-6">
        {/* transaction header */}
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <FiCreditCard className="text-blue-500 text-lg md:text-xl" />
          <span className="text-gray-700 font-semibold text-base md:text-lg">
            تاریخچه تراکنش‌ها
          </span>
        </div>

        {/* transaction loading */}
        {isLoadingTransactions ? (
          <div className="flex items-center justify-center py-8 md:py-12">
            <div className="text-gray-500 text-sm md:text-base">
              در حال بارگذاری تراکنش‌ها...
            </div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
            {/* transaction empty */}
            <FiCreditCard className="text-gray-300 text-4xl md:text-6xl mb-3 md:mb-4" />
            <p className="text-gray-500 text-sm md:text-base">
              هنوز تراکنشی ثبت نشده است
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-2 px-4">
              پس از شارژ کیف پول، تراکنش‌های شما اینجا نمایش داده می‌شود
            </p>
          </div>
        ) : (
          <div className="space-y-2 md:space-y-3 max-h-[400px] md:max-h-[600px] overflow-y-auto">
            {/* transaction list */}
            {transactions.map((transaction) => (
              <div
                key={transaction._id || Math.random()}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 md:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div
                    className={`p-2 md:p-3 rounded-full flex-shrink-0 ${
                      transaction.type === "DEPOSIT"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "DEPOSIT" ? (
                      <FiArrowUpCircle className="text-lg md:text-xl" />
                    ) : (
                      <FiArrowDownCircle className="text-lg md:text-xl" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-right">
                    <p className="font-semibold text-gray-800 mb-0.5 md:mb-1 text-sm md:text-base">
                      {transaction.type === "DEPOSIT"
                        ? "شارژ کیف پول"
                        : "خرید محصول"}
                    </p>
                    <p className="text-[11px] md:text-xs text-gray-400">
                      {formatDate(
                        transaction.createdAt || transaction.updatedAt
                      )}
                    </p>
                  </div>
                </div>

                {/* transaction amount */}
                <div
                  className={`text-right sm:text-left font-bold flex-shrink-0 ${
                    transaction.type === "DEPOSIT"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <div className="flex items-baseline justify-end sm:justify-start gap-1">
                    <span className="text-base md:text-lg">
                      {formatCurrency(Math.abs(transaction.amount || 0))}
                    </span>
                    <span className="text-xs md:text-sm">تومان</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default WalletTransactions;
