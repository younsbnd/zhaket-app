"use client";
import React, { useState } from "react";
import { FaListUl } from "react-icons/fa";
import { BsQuestionCircle, BsHeadphones } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import CommentSection from "./comment/CommentSection";
import DescriptionRenderer from "../../shared/tiptapeditor/DescriptionRenderer";
import ProductFAQSection from "./faq/ProductFAQSection";
import ProductContentSidebar from "./ProductContentSidebar";
import { Button } from "@heroui/react";
import { IoEyeOutline } from "react-icons/io5";



const ProductContent = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [isExpanded, setIsExpanded] = useState(false);

  // tabs
  const tabs = [
    {
      key: "description",
      icon: FaListUl,
      iconSize: 16,
      label: "توضیحات محصول",
      whitespace: true,
    },
    {
      key: "comments",
      icon: AiOutlineStar,
      iconSize: 20,
      label: "دیدگاه‌ها",
    },
    {
      key: "questions",
      icon: BsQuestionCircle,
      iconSize: 20,
      label: "پرسش‌ها",
    },

  ];

  // render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="py-8 px-4 relative">
            <div
              className={`relative overflow-hidden transition-all duration-500 ${
                isExpanded ? "max-h-full" : "max-h-[1000px]"
              }`}
            >
              <DescriptionRenderer description={product?.description} />
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-24 bg-[linear-gradient(180deg,#ffffff00_0%,#ffffffe6_100%)] ">

                  {!isExpanded && (
                    <div className="flex justify-center mt-10">
                      <Button
                        onPress={() => setIsExpanded(true)}
                        className="bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-semibold text-gray-400 hover:bg-gray-500 transition-all duration-300 flex items-center gap-2 hover:text-white"
                      >
                        <IoEyeOutline className="w-4 h-4 text-gray-400 hover:!text-white" />
                        مشاهده بیشتر
                      </Button>
                    </div>
                  )}
                  
                </div>
              )}
            </div>
          </div>
        );
      case "comments":
        return (
          <div className="py-8">
            <CommentSection productId={product?._id} />
          </div>
        );
      case "questions":
        return (
          <div className="py-8">
            <p className="text-[#76767C]">پرسش‌ها به زودی...</p>
          </div>
        );
      case "support":
        return (
          <div className="py-8">
            <p className="text-[#76767C]">اطلاعات پشتیبانی به زودی...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="relative">
        {/* custom tabs */}
        <div className="w-full bg-white border-t-[1px] border-t-[#EDEEF2] mb-6 px-5">
          <div className="gap-6 w-full relative rounded-none p-0 max-w-[1279px] mx-auto flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="max-w-fit px-0 h-16 relative group cursor-pointer"
                >
                  <div
                    className={`flex items-center gap-3 p-0 ${tab.whitespace ? "whitespace-nowrap" : ""}`}
                  >
                    <Icon
                      size={tab.iconSize}
                      className={`transition duration-300 ${
                        isActive ? "text-[#FFA22B]" : "text-[#76767C]"
                      }`}
                    />
                    <span
                      className={`transition duration-300 text-sm leading-7 font-bold ${
                        isActive ? "text-[#565656]" : "text-[#76767C]"
                      }`}
                    >
                      {tab.label}
                    </span>
                  </div>
                  {/* underline indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full bg-[#FF9606] h-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <section className="max-w-[1279px] mx-auto flex gap-6 relative">
        <div className="w-full max-w-full min-w-full py-2 md:max-w-[900px] md:min-w-[900px] md:flex-1 md:p-0">
          {/* tab content panel */}
          <div className="pt-0 pb-8 p-5 bg-white  shadow-[0px_10px_25px_0px_#969BA41A] rounded-md mx-4 md:mx-0">
            <div className="px-4">{renderTabContent()}</div>
          </div>

          {/* product FAQ section */}
          {product?.faqs && product.faqs.length > 0 && (
            <div className="max-w-[1279px] md:mx-auto p-8 mt-8 mb-8 shadow-[0px_10px_25px_0px_#969BA41A] rounded-md bg-white mx-5">
              <ProductFAQSection faqs={product.faqs} />
            </div>
          )}
        </div>
        <div className="hidden w-full max-w-[350px] md:block sticky top-11 h-max">
          <ProductContentSidebar product={product} />
        </div>
      </section>
    </div>
  );
};

export default ProductContent;
