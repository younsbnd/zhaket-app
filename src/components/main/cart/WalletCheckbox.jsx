"use client";

import React from "react";
import { Checkbox } from "@heroui/react";
import { useSession } from "next-auth/react";
import { FaWallet } from "react-icons/fa";

const WalletCheckbox = ({ useWallet, setUseWallet, walletBalance }) => {
  const { data: session } = useSession();

  // don't show if user is not logged in
  if (!session) {
    return null;
  }

  return (
    <div className="border-b border-b-[#E5E8EB] p-5">
      {/* wallet checkbox */}
      <Checkbox
        isSelected={useWallet}
        onValueChange={setUseWallet}
        color="warning"
        classNames={{
          base: "m-0 p-0 max-w-full",
          wrapper:
            "flex h-4 w-4 items-center justify-center rounded-sm before:rounded-sm after:rounded-sm",
          icon: "text-white",
          label: "cursor-pointer pr-3 w-full",
        }}
      >
        {/* wallet checkbox content */}
        <div className="flex items-center justify-between w-full gap-5">
          <div className="flex flex-col">
            <p className="text-sm font-semibold truncate text-[#424244]">
              پرداخت از طریق کیف پول
            </p>
            <p className="text-xs text-[#76767C] mt-1">
              موجودی:{" "}
              <span className="font-bold text-[#FF9606]">
                {walletBalance.toLocaleString()}
              </span>{" "}
              تومان
            </p>
          </div>
          <div className="flex items-center justify-center w-[60px] h-[30px] bg-[#FFF9E6] rounded-md">
            <FaWallet className="text-[#FF9606]" size={24} />
          </div>
        </div>
      </Checkbox>
    </div>
  );
};

export default WalletCheckbox;

