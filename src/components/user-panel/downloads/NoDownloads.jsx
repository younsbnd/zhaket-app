"use client";
import React from "react";
import { Card, CardBody } from "@heroui/react";
import { RiFolderOpenLine } from "react-icons/ri";

const NoDownloads = () => {
  return (
    <div className="text-right bg-transparent p-1 md:py-0 min-h-[calc(100vh-200px)] mt-5">
      <div className="rounded-lg bg-white shadow-[0px_25px_10px_0px_#5B5E6812]">
        <div className="p-6.5 pt-6 !bg-[#FBFCFD]">
          <Card className="rounded-lg bg-white text-card-foreground shadow-none border border-gray-200/85">
            <CardBody className="p-12 text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* Icon */}
                <div className="text-gray-400">
                  <RiFolderOpenLine className="w-16 h-16 text-orange-400/80" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-700">
                  فایل قابل دانلودی وجود ندارد
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-500 max-w-md text-center leading-relaxed">
                  در حال حاضر هیچ فایلی برای دانلود در دسترس نیست. پس از خرید محصولات، فایل‌های مربوطه در این بخش نمایش داده خواهند شد.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NoDownloads;
