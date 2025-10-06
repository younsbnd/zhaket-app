import React from "react";
import CartPaymentMethods from "./CartPaymentMethods";
import CartActionBtn from "./CartActionBtn";
import { useCartStore } from "@/stores/useCartStore";

const CartSummary = () => {
  const { items } = useCartStore();
  return (
    <>
      <div className="flex items-center justify-center w-full p-[10px] md:px-0 *:w-full">
        <div className="max-w-[350px] rounded-md px-[5px] pt-7 shadow-[0px_5px_15px_0px_rgba(73,75,84,0.06)]">
          {/* price section */}
          <div className="flex justify-between px-[15px] py-5">
            <p className="transition duration-300 text-[15px] text-[#76767C]">
              قیمت محصولات
              <span className="ms-1 text-sm">(1)</span>
            </p>
            <div className="flex items-center justify-start gap-1">
              <span className="transition duration-300 font-bold text-[#424244] text-[19px]">
                {items
                  ?.reduce((acc, item) => acc + item.price, 0)
                  .toLocaleString()}
              </span>
              <span className="transition duration-300 text-[13px] text-[#76767C]">
                تومان
              </span>
            </div>
          </div>
          {/* total price section */}
          <div className="flex items-center justify-between rounded-md bg-opacity-5 bg-[linear-gradient(180deg,#84ba521f,rgba(132,186,82,0)_100%)] px-[15px] py-5">
            <p className="transition duration-300 font-bold text-[15px] text-[#668933]">
              مبلغ قابل پرداخت
            </p>
            <div className="flex items-center justify-start gap-1">
              <span className="transition duration-300 font-bold text-[19px] text-[#668933]">
                {items
                  ?.reduce((acc, item) => acc + item.price, 0)
                  .toLocaleString()}
              </span>
              <span className="transition duration-300 text-[13px] text-[#76767C]">
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full p-[10px] pt-[23px] *:w-full md:px-0 md:pt-[5px]">
        {/* payment methods section */}
        <div className="max-w-[350px] rounded-md border border-[#E5E8EB]">
          <CartPaymentMethods />
        </div>
      </div>
      <div className="flex items-center justify-center w-full px-[10px] pt-[19px] md:px-0 *:w-full">
        {/* action button section */}
        <CartActionBtn />
      </div>
    </>
  );
};

export default CartSummary;
