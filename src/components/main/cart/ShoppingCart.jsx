"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import CartHeader from "./CartHeader";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import { useCartStore } from "@/stores/useCartStore";
import { useSession } from "next-auth/react";

const ShoppingCart = () => {
  const { data: session } = useSession();
  const { refreshCart } = useCartStore();

  // refresh cart when session changes
  useEffect(() => {
    if (session) {
      refreshCart(session);
    }
  }, [session, refreshCart]);
  return (
    <div className="relative pt-0.5">
      {/* background image */}
      <Image
        src="/images/main/home/cart/cart-bg.svg"
        alt="cart"
        width={100}
        height={100}
        className="absolute right-0 top-0 -z-10 w-full overflow-hidden bg-repeat-round object-cover h-[141px]!"
        priority
      />
      <div className="mx-auto mt-[26px] mb-[100px] w-full bg-white p-4 md:max-w-[1057px] md:shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)]">
        {/* cart header section */}
        <CartHeader />
        <div className="flex flex-col rounded-md pb-[15px] shadow-[0px_25px_40px_0px_rgba(73,75,84,0.1)] md:flex-row md:justify-between md:gap-[39px] md:pb-0 md:shadow-none">
          <div className="md:flex md:w-full md:flex-col md:justify-between">
            {/* cart items section */}
            <CartItems />
          </div>
          <div className="top-[10%] h-max w-full md:sticky md:max-w-[348px] md:p-5 md:pt-0">
            {/* cart summary section */}
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
