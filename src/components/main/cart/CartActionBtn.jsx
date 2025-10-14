"use client";

import React, { useState } from "react";
import { Button, Checkbox, addToast } from "@heroui/react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { logger } from "@/lib/utils/logger";
import { useCrud } from "@/hooks/useCrud";
import { useRouter } from "next/navigation";

const CartActionBtn = ({ useWallet }) => {
  const [isAcceptedCheckbox, setIsAcceptedCheckbox] = useState(false);
  const { createRecord: createCheckout, isLoading } = useCrud("/checkout");
  const router = useRouter();

  //   submit handler for checkout
  const handleSubmit = async () => {
    if (!isAcceptedCheckbox) {
      addToast({
        title:
          "برای ادامه‌ی خرید لازم است شرایط و قوانین را مطالعه کرده و بپذیرید",
        color: "primary",
        variant: "solid",
      });
      return;
    }

    // try to create checkout
    try {
      const response = await createCheckout({
        useWallet: useWallet,
      });

      // check if checkout is paid with wallet
      if (response.data.isPaidWithWallet) {
        addToast({
          description: response.data.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        return;
      }

      // check if checkout is successful
      if (response.data.success) {
        logger.debug("checkout response is :", response.data.paymentUrl);
        router.push(response.data.paymentUrl);
      }
    } catch (error) {
      // show toast for error
      addToast({
        description: error?.error?.message || error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <div className="flex max-w-[350px] flex-col items-start justify-center">
      <div className="flex items-center">
        {/* checkbox to accept terms and conditions */}
        <Checkbox
          isSelected={isAcceptedCheckbox}
          color="warning"
          onValueChange={setIsAcceptedCheckbox}
          classNames={{
            base: "m-0 p-0",
            wrapper:
              "flex h-4 w-4 items-center justify-center rounded-sm   before:rounded-sm after:rounded-sm",
            icon: "text-white ",
            label: "cursor-pointer pr-[10px]",
          }}
        >
          <p className="text-sm leading-7 text-[#5B5C60] transition duration-300">
            قوانین و{" "}
            <Link
              href="/content/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF9606]"
            >
              شرایط ژاکت
            </Link>{" "}
            را مطالعه کردم
          </p>
        </Checkbox>
      </div>
      {/* submit button for checkout */}
      <Button
        type="button"
        onPress={handleSubmit}
        className="mt-[29px] flex h-[59px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-lg bg-[#81CF33] px-4 py-3 text-base font-semibold text-[#F9FAFC] shadow-[0px_5px_25px_0px_rgba(52,168,85,0.17)] transition duration-300 hover:bg-[#F5FBED] hover:text-[#81CF33] focus:outline-0 focus:outline-hidden"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        <div className="flex items-center justify-center">
          ثبت و پرداخت
          <FaArrowLeft className="pr-2" size={24} />
        </div>
      </Button>
    </div>
  );
};

export default CartActionBtn;
