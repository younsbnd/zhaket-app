import Link from "next/link";
import React from "react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";

const ProductActionButtons = ({ product }) => {
  return (
    <div className="relative ">
      <div className="flex items-center justify-center z-30 -mt-4 w-full translate-y-0 transform gap-2.5 px-4 transition-all duration-300 md:mt-0 md:gap-[15px] md:p-6 relative">
        {/* Preview Button */}
        <Link
          data-cy="data-cy-preview-button"
          href={`#`}
          className="flex-1 h-[55px] md:max-w-[50%]"
        >
          <button
            className="cursor-pointer flex items-center justify-center gap-[10px] rounded-lg focus:outline-hidden focus:outline-0 border border-[#E5E8EB] bg-white shadow-[0px_2px_6px_0px_rgba(126,137,155,0.08)] h-full w-full p-0 text-[13px] font-bold text-[#7E899B] transition duration-300 hover:bg-[#878F9B] hover:text-white"
            type="button"
          >
            <AiOutlineEye className="w-4 h-4" />
            <div className="flex items-center justify-center">پیشنمایش</div>
          </button>
        </Link>

        {/* Add to Cart Button */}
        <button
          data-cy="data-cy-add-to-card-button"
          className="font-semibold cursor-pointer flex items-center justify-center rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 gap-2.5 hover:bg-[#EB8800] flex-1 bg-[#FFAE11] p-0 text-[13px] text-white h-[55px] md:max-w-[50%]"
          type="button"
        >
          <AiOutlineShoppingCart className="w-4 h-4" />
          <div className="flex items-center justify-center">
            افزودن به سبد خرید
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductActionButtons;
