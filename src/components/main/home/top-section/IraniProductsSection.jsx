import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const IraniProductsSection = () => {
  return (
    <div>
      <Image
        src="/images/main/home/top-section/spotlight-bg.ca693c14.svg"
        alt="iran-products"
        width={326}
        height={440}
        priority
        className="-z-10 h-full w-full absolute top-0 left-0 right-0 bottom-0"
      />
      <div className="flex justify-center items-end gap-2">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="flex flex-col justify-between overflow-hidden border border-[#F4F4F4] border-none rounded-md bg-white shadow-md p-4">
            <Link href={"#"} className="">
              <Image
                src={"/images/main/home/top-section/update-zhaket.png"}
                alt="update-zhaket"
                width={40}
                height={40}
                className="rounded-[15px] object-cover object-top"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-between overflow-hidden border border-[#F4F4F4] border-none rounded-md bg-white shadow-md p-4">
            <Link href={"#"} className="">
              <Image
                src={"/images/main/home/top-section/zhaket-installer.png"}
                alt="zhaket-installer"
                width={40}
                height={40}
                className="rounded-[15px] object-cover object-top"
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col gap-2 pb-3">
          <div className="flex flex-col justify-between overflow-hidden border border-[#F4F4F4] border-none rounded-md bg-white shadow-md p-4">
            <Link href={"#"} className="">
              <Image
                src={"/images/main/home/top-section/dinakala-icon.png"}
                alt="dinakala-icon"
                width={40}
                height={40}
                className="rounded-[15px] object-cover object-top"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-between overflow-hidden border border-[#F4F4F4] border-none rounded-md bg-white shadow-md p-4">
            <Link href={"#"} className="">
              <Image
                src={"/images/main/home/top-section/payment-reminder.png"}
                alt="iran-products"
                width={40}
                height={40}
                className="rounded-[15px] object-cover object-top"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col pt-6">
        <p className="font-bold text-[17px] text-yellow-900">
          محصولات ایرانی
        </p>
        <p className="text-sm leading-7 font-semibold pt-1 text-yellow-800/50">
          پشتیبانی درجه یک
        </p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button className="relative mt-6 h-11 w-[120px] top-btn">
          قالب ایرانی
        </Button>
        <Button className="relative mt-6 h-11 w-[120px] top-btn">
          افزونه ایرانی
        </Button>
      </div>
    </div>
  );
};

export default IraniProductsSection;
