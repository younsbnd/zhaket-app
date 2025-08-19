"use client";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import Image from "next/image";
import React from "react";

// modal for security tips in login page
const ModalSecurityTips = ({ isOpen, onOpenChange }) => {
  return (
    <>
      <Modal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          closeButton: "m-5 text-[19px] text-gray-500 cursor-pointer",
          base: "w-90 p-2 py-4",
        }}
      >
        {/* modal content */}
        <ModalContent>
          {(onClose) => (
            <>
              {/* modal header */}
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-[13px] text-gray-700 font-semibold">
                  نکات امنیتی
                </span>
              </ModalHeader>
              {/* modal body */}
              <ModalBody>
                <section className="flex flex-col gap-7 pb-8">
                  <div className="flex items-center gap-4 mt-3">
                    <Image
                      src="/images/auth/term-browser.svg"
                      alt="security-tips"
                      width={100}
                      height={100}
                      className="w-10 h-10"
                    />
                    <p className="text-[12px] text-gray-800 ">
                      لطفا از مرورگرهای مطمئن و بروز مانند گوگل کروم و فایرفاکس
                      استفاده کنید.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/auth/term-pass.png"
                      alt="security-tips"
                      width={100}
                      height={100}
                      className="w-10 h-10"
                    />
                    <p className="text-[12px] text-gray-800">
                      لطفا کلمه عبور خود را در فواصل زمانی کوتاه حتما بررسی و
                      تغییر دهید.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/auth/term-email.svg"
                      alt="security-tips"
                      width={100}
                      height={100}
                      className="w-10 h-10"
                    />
                    <p className="text-[12px] text-gray-800">
                      ژاکت اطلاعات شما را از طریق ایمیل درخواست نمیکند. در صورت
                      رخداد به ژاکت اطلاع دهید.
                    </p>
                  </div>
                </section>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSecurityTips;
