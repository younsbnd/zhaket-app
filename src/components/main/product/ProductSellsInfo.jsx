import React from "react";
import { AiFillStar } from "react-icons/ai";

const ProductSellsInfo = ({ product }) => {
  return (
    <div className="relative bottom-8 z-10 mx-auto px-4 md:static md:m-0 md:pl-0 md:pr-8 md:pt-6 ">
      <div className="flex items-center w-full gap-3 bg-white order-3 md:order-2">
        <div className="flex w-full flex-col">
          {/* product rate */}
          <div className="flex items-center gap-1">
            <span className="transition duration-300 productRate text-[22px] font-bold text-[#424244] md:text-[28px]">
              4.8
            </span>
            <AiFillStar className="text-orange-300" />
          </div>
          <span className="transition duration-300 text-sm text-[#76767C] font-bold">
            از 53 رای
          </span>
        </div>
        {/* product count */}
        <div className="flex w-full flex-col">
          <span className="transition duration-300 productCount text-[22px] font-bold text-[#424244] md:text-[28px]">
            2000
          </span>
          <span className="transition duration-300 text-sm text-[#76767C] font-bold">
            فروش موفق
          </span>
        </div>
        {/* product price */}
        <div className="productPrice relative flex h-full items-center gap-3 rounded-s-md bg-[linear-gradient(111.32deg,_#FFDAA266_-1.54%,_#FFF3E066_21.68%)] px-7 pb-[17px] pt-[22px] md:p-5 md:pr-10">
          <div className="flex justify-start w-full flex-col items-end gap-0">
            <span className="transition duration-300 text-xl leading-7 text-[#424244] text-[22px]! md:text-[25px]! font-bold productRegPrice flex-col">
              {product?.price.toLocaleString()}
            </span>
            <span className="transition duration-300 text-[13px] text-[#BFBFBF]">
              تومان
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSellsInfo;
