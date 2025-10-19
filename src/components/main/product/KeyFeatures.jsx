import { PRODUCT_KEY_FEATURES } from "@/constants/products/productKeyFeatures";
import Image from "next/image";
import React from "react";
import { FcOk } from "react-icons/fc";

const KeyFeatures = () => {
  return (
    <section className="p-4 pb-[9px] h-full">
      <div className="rounded-md bg-[linear-gradient(180deg,_#F9FAFC_0%,_#FFFFFF_30.97%)] px-[25px] pt-[30px] pb-[8px] h-full flex flex-col justify-around">
        <div className="bg-[linear-gradient(180deg,_#F9FAFC_0%,_#FFFFFF_30.97%)] border-b-[1px] border-b-[#F4F5F6] md:border-dashed md:border-b-[#0000001A]">
          <h3 className="text-lg font-bold text-[#424B57]">ویژگی‌های کلیدی</h3>
          <ul className="py-2">
            {/* product key features */}
            {PRODUCT_KEY_FEATURES.map((feature) => (
              <li
                key={feature.id}
                className="border-b-[#F4F5F6] py-1 flex items-center gap-2"
              >
                <FcOk className="w-5 h-5 flex-shrink-0" />
                <p className="truncate text-gray-500 leading-7 text-sm">
                  {feature.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          {/* products best seller image*/}
          <Image
            src={"/uploads/products/1759232233803-new-icon-zhaket.png"}
            alt={"آیکون جدید ژاکت"}
            width={45}
            height={45}
            priority
            quality={100}
            className="object-cover w-auto h-auto"
          />
          <p className="text-[14px] font-semibold text-gray-500/80 truncate">
            محصولات پرفروش ژاکت
          </p>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
