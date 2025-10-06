"use client";

import React, { useState } from "react";
import { RadioGroup, Radio } from "@heroui/react";
import Image from "next/image";
import { paymentMethods } from "@/constants/main/cart/paymentMethods";

const CartPaymentMethods = () => {
  const [selectedPayment, setSelectedPayment] = useState("digipay");

  return (
    <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
      {/* payment methods */}
      {paymentMethods?.map((method, index) => (
        <Radio
          key={method.id}
          value={method.id}
          classNames={{
            base: `m-0 max-w-full cursor-pointer border-b border-b-[#E5E8EB] outline-hidden transition duration-300 p-0 ${
              selectedPayment === method.id
                ? "bg-[linear-gradient(180deg,rgba(255,182,22,0.17)_0%,rgba(255,182,22,0)_100%)]"
                : ""
            } ${index === paymentMethods.length - 1 ? "border-b-0" : ""}`,
            wrapper: "hidden",
            labelWrapper: "m-0 w-full",
            label: "w-full",
          }}
        >
          <div
            className={`flex h-[68px] items-center justify-between border px-5 py-7 transition duration-300 ${
              selectedPayment === method.id
                ? "rounded-br-md rounded-bl-md border-[#FFC87B]"
                : "border-white"
            }`}
          >
            <div className="flex items-center justify-center gap-[10px]">
              <span
                className={`group flex size-[18px] items-center justify-center rounded-full border bg-white bg-clip-padding outline-hidden transition-colors duration-300 ease-in-out ${
                  selectedPayment === method.id
                    ? "border-none bg-[linear-gradient(247.65deg,#FFC107_-35.57%,#FF9737_100%)]"
                    : "border-[#E5E8EB]"
                }`}
              >
                <div
                  className={`size-[10px] rounded-full bg-white ${
                    selectedPayment === method.id ? "visible" : "invisible"
                  }`}
                ></div>
              </span>
              {/* payment method name */}
              <p
                className={`text-sm leading-7 transition duration-300 ${
                  selectedPayment === method.id
                    ? "font-bold text-[#424244]"
                    : "text-[#424244]"
                }`}
              >
                {method.name}
              </p>
            </div>
            {/* payment method logo */}
            <Image
              alt={method.name}
              loading="lazy"
              width={60}
              height={30}
              src={method.logo}
              className="object-contain"
            />
          </div>
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default CartPaymentMethods;
