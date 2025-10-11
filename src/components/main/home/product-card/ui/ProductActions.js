"use client";
import { memo } from "react";
import Link from "next/link";
import { TbShoppingCart } from "react-icons/tb";
import { FaEye } from "react-icons/fa";

const ProductActions = ({ demoLink, isGrid = true }) => {
    return (
        <div className={`flex gap-2 ${isGrid ? "" : "justify-end"}`}>
            {/* Preview Button */}
            <Link
                href={demoLink}
                target="_blank"
                className={isGrid ? "flex-1" : "w-[168px]"}
            >
                <button
                    className={`${isGrid ? "w-full h-[42px]" : "h-[51px] w-full"} flex items-center justify-center gap-2 rounded-lg bg-[#EAEEF380] text-[13px] font-bold text-[#7E899B] hover:bg-[#878F9B] hover:text-white transition-colors`}
                >
                    <FaEye className="w-4 h-4" />
                    پیشنمایش
                </button>
            </Link>

            {/* Add to Cart Button */}
            <button
                className={`${isGrid ? "flex-1 h-[42px]" : "w-[168px] h-[51px]"} flex items-center justify-center gap-2 rounded-lg bg-[#FFAE11] text-[13px] font-semibold text-white hover:bg-[#EB8800] transition-colors`}
            >
                <TbShoppingCart className="w-4 h-4" />
                افزودن به سبد خرید
            </button>
        </div>
    );
};

export default memo(ProductActions);
