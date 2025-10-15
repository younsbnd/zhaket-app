"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSession } from "next-auth/react";
import DiscountCodeSection from "./DiscountCodeSection";
import { useCartStore } from "@/stores/useCartStore";

const CartItems = () => {
  const noImage = "/images/no-image.png";
  const { removeFromCart, items } = useCartStore();
  const { data: session } = useSession();
  return (
    <>
      {items?.map((item) => (
        <div key={item._id} className="mt-[25px] md:mt-0">
          <div className="flex flex-col border shadow-none relative z-10! items-start justify-start overflow-visible rounded-none border-transparent bg-[#fff] px-[15px] py-[25px] md:pl-0">
            <div className="flex w-full">
              {/* remove button */}
              <div className="flex items-center justify-center h-[60px]">
                <button
                  className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] text-white transition duration-300 focus:outline-hidden focus:outline-0 text-xs ml-[17px] h-[23px] w-[23px] rounded-lg bg-[#FFF1ED] p-0"
                  onClick={() => removeFromCart(item._id, session)}
                >
                  <div className="flex items-center justify-center">
                    <AiOutlineClose className="w-4 h-4 text-[#FF7640]" />
                  </div>
                </button>
              </div>
              {/* product image */}
              <Image
                src={item?.images?.url || noImage}
                alt={item?.images?.alt || item?.title}
                width={60}
                height={60}
                className="object-cover h-[66px] w-[66px] rounded-xl"
                priority
              />
              <div className="p-4 flex w-full flex-col py-0 pl-2 md:pl-0">
                {/* Product Title and Price */}
                <div className="md:flex md:items-center md:justify-between">
                  <Link href={`/products/${item?.slug}`}>
                    <p className="transition duration-300 text-base leading-7 font-bold line-clamp-1 text-[#424244]">
                      {item?.title}
                    </p>
                  </Link>
                  <div>
                    <div className="hidden flex-row pr-4 items-center gap-1 md:flex">
                      <div className="flex items-center justify-start gap-1">
                        <span
                          className="transition duration-300 font-bold text-[#424244] text-[19px]"
                          data-cy="data-cy-product-price"
                        >
                          {item?.price.toLocaleString()}
                        </span>
                        <span className="transition duration-300 text-[13px] text-[#76767C]">
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seller section */}
                <div className="flex items-center justify-between">
                  <p className="transition duration-300 text-[13px] text-[#76767C]">
                    مگاتم
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Mobile Price */}
                    <div className="flex md:hidden">
                      <div className="flex flex-row pr-4 items-center gap-1">
                        <div className="flex items-center justify-start gap-1">
                          <span
                            className="transition duration-300 font-bold text-[#424244] text-[19px]"
                            data-cy="data-cy-product-price"
                          >
                            {item?.price.toLocaleString()}
                          </span>
                          <span className="transition duration-300 text-[13px] text-[#76767C]">
                            تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="border-t-[1px] border-t-[#F4F5F6] px-[15px] pt-[30px] md:pb-5">
        <DiscountCodeSection />
      </div>
    </>
  );
};

export default CartItems;
