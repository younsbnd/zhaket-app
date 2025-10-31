"use client";
import React, { useState } from "react";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { BsCheckCircleFill, BsInfoCircle } from "react-icons/bs";
import { Button, Tooltip } from "@heroui/react";
import { useCartStore } from "@/stores/useCartStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { PRODUCTS_ICONS } from "@/constants/products/productsIcons";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { formatDate } from "@/lib/utils/formatDate";

const ProductContentSidebar = ({ product }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const { addToCart } = useCartStore();
  const { data: session } = useSession();

  const handleOptionToggle = (optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  // calculate the total price
  const calculateTotalPrice = () => {
    let total = product?.price || 1350000;
    Object.keys(selectedOptions).forEach((optionId) => {
      if (selectedOptions[optionId]) {
        const option = purchaseOptions.find((opt) => opt.id === optionId);
        if (option) {
          total += option.price;
        }
      }
    });
    return total;
  };

  // format the price
  const formatPrice = (price) => {
    return price.toLocaleString("fa-IR");
  };

  return (
    <div className="w-full rounded-lg bg-white shadow-[0px_10px_25px_0px_#969BA41A] py-5">
      {/* Price Section */}
      <div className="mb-6 flex items-start justify-between ">
        <div className="flex flex-col items-start gap-2 text-sm text-[#76767C] p-5">
          <AiOutlineShoppingCart className="text-orange-300" size={25} />
          <span className="font-bold flex items-center gap-1">
            <span className="text-[17px] font-bold text-[#424244]">۳۴۶۵۸</span>
            فروش
          </span>
        </div>
        {/* product price */}
        <div className="flex flex-col items-end bg-[linear-gradient(111.32deg,_#FFDAA266_-1.54%,_#FFF3E066_21.68%)] p-5 rounded-s-md">
          <div className="text-[28px] font-bold text-[#424244]">
            {formatPrice(calculateTotalPrice())}
          </div>
          <div className="text-xs text-[#BFBFBF]">تومان</div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-6 space-y-3 p-5">
        <div className="flex items-center gap-2">
          <BsCheckCircleFill className="text-[#4CAF50]" size={16} />
          <span className="text-sm text-gray-500">۶ ماه پشتیبانی رایگان</span>
        </div>
        <div className="flex items-center gap-2">
          <BsCheckCircleFill className="text-[#4CAF50]" size={16} />
          <span className="text-sm text-gray-500">
            دسترسی دائمی به فایل محصول
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BsCheckCircleFill className="text-[#4CAF50]" size={16} />
          <span className="text-sm text-gray-500">
            تضمین اصالت و کیفیت توسط ژاکت
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="px-5">
        <Button
          className="mb-4 w-full rounded-lg bg-[#FFAE11] py-6 text-sm font-bold text-white transition duration-300 hover:bg-[#EB8800] "
          onPress={() => addToCart(product, session)}
        >
          <AiOutlineShoppingCart size={20} />
          افزودن به سبد خرید
        </Button>
      </div>
      {/* Badge Icons */}
      <div className="mb-6 flex items-center justify-center">
        <div className="flex items-center justify-center border-2 rounded-full border-none">
          {/* product icons */}
          {PRODUCTS_ICONS.map((icon) => (
            <Tooltip
              content={icon.title}
              key={icon.id}
              placement="top"
              showArrow
              className=""
              color="foreground"
              classNames={{
                content: "bg-gray-700 text-white rounded text-[12px]",
              }}
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={36}
                height={36}
                priority
                className="object-cover rounded-full border-1 -mr-3"
              />
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Product Metadata */}
      <div className="space-y-3 border-t border-[#EDEEF2] pt-4 px-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#76767C]">تاریخ انتشار</span>
          <span className="text-sm font-bold text-[#424244]">
            {formatDate(product?.createdAt, "YYYY/MM/DD")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#76767C]">نسخه</span>
          <span className="text-sm font-bold text-[#424244]">۸.۳.۳</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#76767C]">تاریخ بروزرسانی</span>
          <span className="text-sm font-bold text-[#424244]">
            {formatDate(product?.updatedAt, "YYYY/MM/DD")}
              </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#76767C]">امتیاز</span>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-gray-500">۴.۴</span>
            <div className="flex">
              <AiFillStar className="text-[#E0E0E0]" size={16} />
              {[1, 2, 3, 4].map((star) => (
                <AiFillStar key={star} className="text-[#FFA22B]" size={16} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rate Product Link */}
      <div className="px-5">
        <div className="mt-4 flex items-center justify-center gap-2 bg-[#F5FBED] p-3 w-full">
          <div className="flex items-center justify-between gap-2 text-sm text-lime-500 w-full">
            <span>به محصول امتیاز دهید</span>
            <span className="rotate-180 bg-lime-500 p-[11px] rounded-md cursor-pointer">
              <FaArrowRight className="text-white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContentSidebar;
