"use client";
import React from "react";
import Image from "next/image";

const ProductShow = ({ order }) => {
  return (
    <div className="text-right mt-2 flex flex-col md:gap-5 gap-2.5">
      {order?.items?.map((item, index) => (
        <div key={index} className="text-right relative">
          <div className="rounded-lg bg-white text-card-foreground border border-gray-200 shadow-gray-200 shadow-2xl lg:p-6 p-4 flex lg:flex-row lg:gap-2 gap-5 justify-between lg:items-center !z-1 relative">
            <div className="text-right bg-transparent flex flex-row gap-3 items-center flex-grow">
              <span className="relative flex shrink-0 overflow-hidden w-[100px] h-[90px] rounded-lg">
                <Image
                  className="aspect-square h-full w-full"
                  src={
                    item?.product?.images?.url || "/images/default-product.svg"
                  }
                  alt="محصول"
                  width={60}
                  height={60}
                />
              </span>
              <div className="text-right bg-transparent space-y-1.5">
                <div className="text-right bg-transparent flex flex-row">
                  <div className="text-right bg-transparent leading-7 text-lg">
                    {item?.product?.title ||
                      "قالب کیدنس پرو | قالب چند منظوره Kadence Pro"}
                    <span className="inline-flex -mb-0.5 bg-gray-500 h-3.5 w-[1px] mx-1.5"></span>
                    <p className="text-sm font-medium text-gray-800 inline-flex leading-7">
                      {item?.priceAtPurchase
                        ? item.priceAtPurchase.toLocaleString("fa-IR")
                        : order?.totalPrice
                          ? order.totalPrice.toLocaleString("fa-IR")
                          : "۱٬۱۰۰٬۰۰۰"}
                      &nbsp;
                      <span className="text-gray-700 text-xs font-light">
                        تومان
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right bg-transparent flex flex-row items-center gap-1.5">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full w-[23px] h-[23px]">
                    <Image
                      className="aspect-square h-full w-full"
                      alt="store logo"
                      src={
                        item?.product?.developer?.logo ||
                        "/images/default-avatar.svg"
                      }
                      width={23}
                      height={23}
                    />
                  </span>
                  <p className="text-xs font-medium text-gray-600 leading-5 tracking-tight">
                    توسعه&nbsp;دهنده:{" "}
                    {item?.product?.developer?.name || "ناگاتم"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductShow;
