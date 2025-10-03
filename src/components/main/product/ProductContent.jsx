"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { FaListUl } from "react-icons/fa";
import { BsQuestionCircle, BsHeadphones } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";

const ProductContent = ({ product }) => {
  return (
    <div>
      <div className="relative ">
        <Tabs
          aria-label="محتوای محصول"
          classNames={{
            base: "w-full bg-white border-t-[1px] border-t-[#EDEEF2] mb-6 ",
            tabList:
              "gap-6 w-full relative rounded-none p-0 max-w-[1279px] mx-auto",
            cursor: "w-full bg-[#FF9606] h-0.5",
            tab: "max-w-fit px-0 h-16",
            tabContent:
              "group-data-[selected=true]:text-[#565656] text-[#76767C] font-bold",
            panel:
              "pt-0 pb-8 p-5 bg-white max-w-[1279px] mx-auto shadow-[0px_10px_25px_0px_#969BA41A] rounded-md",
          }}
          variant="underlined"
        >
           <Tab
             key="description"
             title={
               <div className="flex items-center gap-3 p-0 whitespace-nowrap">
                 <FaListUl size={16} className="transition duration-300 group-data-[selected=true]:text-[#FFA22B] text-[#76767C]" />
                 <span className="transition duration-300 text-sm leading-7">
                   توضیحات محصول
                 </span>
               </div>
             }
           >
            <div className="py-8">
              <div dangerouslySetInnerHTML={{ __html: product?.description }} />
            </div>
          </Tab>

           <Tab
             key="comments"
             title={
               <div className="flex items-center gap-3 p-0">
                 <AiOutlineStar size={20} className="transition duration-300 group-data-[selected=true]:text-[#FFA22B] text-[#76767C]" />
                 <span className="transition duration-300 text-sm leading-7">
                   دیدگاه‌ها
                 </span>
               </div>
             }
           >
            <div className="py-8">
              <p className="text-[#76767C]">دیدگاه‌ها به زودی...</p>
            </div>
          </Tab>

           <Tab
             key="questions"
             title={
               <div className="flex items-center gap-3 p-0">
                 <BsQuestionCircle size={20} className="transition duration-300 group-data-[selected=true]:text-[#FFA22B] text-[#76767C]" />
                 <span className="transition duration-300 text-sm leading-7">
                   پرسش‌ها
                 </span>
               </div>
             }
           >
            <div className="py-8">
              <p className="text-[#76767C]">پرسش‌ها به زودی...</p>
            </div>
          </Tab>

           <Tab
             key="support"
             title={
               <div className="flex items-center gap-3 p-0">
                 <BsHeadphones size={20} className="transition duration-300 group-data-[selected=true]:text-[#FFA22B] text-[#76767C]" />
                 <span className="transition duration-300 text-sm leading-7">
                   پشتیبانی
                 </span>
               </div>
             }
           >
            <div className="py-8">
              <p className="text-[#76767C]">اطلاعات پشتیبانی به زودی...</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductContent;
