import { PRODUCTS_ICONS } from "@/constants/products/productsIcons";
import { Tooltip } from "@heroui/react";
import Image from "next/image";
import React from "react";

const ProductTopInfo = ({ product }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* product title */}
      <h1 className="text-[22px] font-bold text-[#424244] md:pb-4">
        {product?.title}
      </h1>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* product image  */}
          <div className="cursor-pointer flex items-center justify-center rounded-full">
            <Image
              src={"/uploads/products/1759214490091-for-woodmart-theme.png"}
              alt={"وردپرس من"}
              width={30}
              height={30}
              priority
              className="object-cover relative z-10 rounded-full border-2 border-[#FFFFFF] shadow-[0px_2px_8px_0px_#0000000D] ring-2 ring-orange-400"
            />
          </div>
          <p className="transition duration-300 text-sm leading-7 cursor-pointer font-medium text-[#878F9B] truncate">
            توسعه دهنده: ژاکت
          </p>
        </div>
        <div className="">
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
      </div>
    </div>
  );
};

export default ProductTopInfo;
