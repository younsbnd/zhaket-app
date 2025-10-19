"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { RiFolderDownloadLine } from "react-icons/ri";
import { logger } from "@/lib/utils/logger";

const DownloadItem = ({ product, handleDownload, downloadingFileId }) => {
  const noImage = "/images/no-image.png";
  const fileId = product?.files?.[0];
  const isLoading = downloadingFileId === fileId;
  
  return (
    <div className="rounded-lg bg-white text-card-foreground gap-3.5 shadow-none border border-gray-200/85">
      <div className="p-6.5 px-0 py-0 w-full">
        <div className="text-right bg-transparent flex justify-start flex-nowrap gap-4 lg:justify-between items-center w-full md:px-6 px-3.5 flex-col md:flex-row min-h-[108px]">
          {/* product info */}
          <div className="text-right bg-transparent flex flex-row justify-start flex-nowrap lg:gap-4.5 gap-3  items-center w-full md:py-6 pt-6 pr-2 md:pr-0">
            {/* product image */}
            <div className="text-right bg-transparent min-w-[60px] min-h-[60px] rounded-lg relative">
              <Image
                src={product?.images?.url || noImage}
                alt={product?.images?.alt || product?.title}
                width={60}
                height={60}
                className="h-[60px] w-[60px] object-contain rounded-lg"
              />
            </div>
            {/* product title */}
            <div className="text-right bg-transparent">
              <div className="text-right bg-transparent flex justify-start flex-nowrap gap-5 flex-col md:flex-row items-start">
                <Link
                  href="/panel/downloads/1"
                  className="text-gray-900 !leading-7 tracking-tighter hover:text-orange-400 w-full text-[13px] lg:text-base"
                >
                  {product?.title}
                </Link>
              </div>
            </div>
          </div>
          {/* download button */}
          <div className="text-right bg-transparent flex justify-start items-start flex-nowrap xl:flex-row flex-col gap-3.75 lg:flex-wrap lg:justify-end lg:items-end lg:shrink-0 w-full lg:w-auto py-6">
            <div className="text-right bg-transparent lg:w-auto w-full">
              <Button
                className="flex flex-1 items-center py-4 transition-all [&[data-state=open]>svg]:rotate-0 lg:w-auto w-full h-[46px] px-4.5 min-w-[138px] gap-1.5 rounded-md text-sm font-bold border-[1.5px] bg-background border-orange-300 text-orange-400 justify-center mb-2 md:mb-0 hover:bg-orange-400 hover:text-white hover:border-orange-300"
                onPress={() =>
                  product?.files?.length > 0 && handleDownload(fileId)
                }
                isDisabled={isLoading || product?.files?.length === 0}
                isLoading={isLoading}
              >
                <RiFolderDownloadLine className="w-5 h-5" />
                {product?.files?.length > 0 ? "دانلود فایل" : "فایل موجود نیست"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadItem;
