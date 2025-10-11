"use client";
import { memo } from "react";
import { TbShoppingCart, TbShoppingCartDiscount } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { PiStarThin } from "react-icons/pi";

const formatNumber = (num) => new Intl.NumberFormat("fa-IR").format(num || 0);
const formatRating = (rating) =>
    !rating || isNaN(rating) ? "0.0" : Number(rating).toFixed(1);

const ProductStats = ({ rating = {}, salesCount = 0, isGrid = true }) => {
    return (
        <div
            className={`flex items-center ${isGrid ? "gap-3.5" : "flex-col items-start gap-3.5"}`}
        >
            {/* Sales Count */}
            <div className="flex items-center gap-1">
                {isGrid ? (
                    <TbShoppingCartDiscount className="h-4 w-4 text-[#878F9B]" />
                ) : (
                    <TbShoppingCart className="text-2xl text-[#fcb95c]" />
                )}
                <span
                    className={`${isGrid ? "text-sm" : "text-lg font-bold"} text-[#${isGrid ? "878F9B" : "424244"}]`}
                >
                    {formatNumber(salesCount)}
                </span>
                {!isGrid && <p className="text-xs text-[#76767C]">فروش</p>}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
                {isGrid ? (
                    <FaStar className="h-4 w-4 text-[#FFC87B]" />
                ) : (
                    <PiStarThin className="text-2xl text-[#FF9606]" />
                )}
                <span
                    className={`${isGrid ? "text-sm" : "text-lg font-bold"} text-[#${isGrid ? "878F9B" : "424244"}]`}
                >
                    {formatRating(rating.average)}
                </span>
                {!isGrid && (
                    <p className="text-xs text-[#76767C]">رای: {rating?.count || 0}</p>
                )}
            </div>
        </div>
    );
};

export default memo(ProductStats);
