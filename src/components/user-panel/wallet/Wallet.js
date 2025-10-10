"use client";

import React from "react";
import WalletBalance from "./WalletBalance";
import WalletDeposit from "./WalletDeposit";
import WalletTransactions from "./WalletTransactions";
import WalletMessages from "./WalletMessages";

const Wallet = ({
  handleSubmit,
  onSubmit,
  errors,
  isLoading = false,
  control,
  balance = 0,
  transactions = [],
  isLoadingTransactions = false,
}) => {
  return (
    <div className="w-full mt-4 md:mt-8 pb-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          {/* Right Column - Balance and Deposit Form */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Balance Card */}
            <WalletBalance balance={balance} />

            {/* Deposit Form Card */}
            <WalletDeposit
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              isLoading={isLoading}
              control={control}
            />
          </div>

          {/* Left Column - Transactions History */}
          <div className="lg:col-span-2">
            <WalletTransactions
              transactions={transactions}
              isLoadingTransactions={isLoadingTransactions}
            />
          </div>
          {/* show toast messages */}
          <div>
            <WalletMessages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
