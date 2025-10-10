"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { FiCreditCard } from "react-icons/fi";

const WalletBalance = ({ balance = 0 }) => {
  // Format number to Persian currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fa-IR").format(amount);
  };

  return (
    <Card className="shadow">
      <CardBody className="p-4 md:p-6">
        {/* wallet balance header */}
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <FiCreditCard className="text-amber-500 text-lg md:text-xl" />
          <span className="text-gray-700 font-semibold text-sm md:text-base">
            موجودی کیف پول
          </span>
        </div>
        {/* wallet balance */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 md:p-6 text-center">
          <p className="text-2xl md:text-3xl font-bold text-amber-600 mb-2">
            {formatCurrency(balance)}
          </p>
          <p className="text-xs md:text-sm text-gray-600">تومان</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default WalletBalance;
