"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiEnvelope } from "react-icons/hi2";
import { HiArrowLeft } from "react-icons/hi";
import { Button, Input } from "@heroui/react";

export default function FooterDesktopSection({ footerLinks }) {
  return (
    <div className="justify-between md:flex md:pt-[50px]">
      {/* Navigation columns (desktop) */}
      <div className="hidden md:grid md:grid-cols-3 w-[calc(100%_-_377px)] pt-[25px] gap-x-10">
        {footerLinks.map((section, index) => (
          <div
            key={section.title}
            className="flex w-full flex-col items-start gap-4"
          >
            {index === 0 && (
              <Link href="/">
                <Image
                  alt="ژاکت"
                  width={60}
                  height={43}
                  src="/images/logo.svg"
                  className="min-h-[31px] w-auto min-w-[44px]"
                  priority
                />
              </Link>
            )}
            <p
              className={`text-base text-[#424244] leading-7 ${index === 0 ? "hidden" : ""
                } md:block`}
            >
              {section.title}
            </p>
            <div className="flex flex-col items-start gap-2">
              {section.links.map((link) => (
                <p
                  key={link.href}
                  className="text-sm leading-7 text-[#76767C] transition duration-300"
                >
                  <Link href={link.href}>{link.label}</Link>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter and contact box */}
      <div className="flex flex-col md:w-[377px]">
        {/* Newsletter card */}
        <div className="mt-4 h-[159px] rounded-xl border-[3px] border-white bg-[linear-gradient(233.69deg,#FFDAA2_-5.92%,#FFF3E0_17.7%)] p-7 shadow-[0px_5px_25px_0px_rgba(255,107,1,0.08)]">
          <div className="flex items-center gap-3 pb-2">
            <Image alt="ژاکت" priority width={22} height={22} src="/images/logo.svg" />
            <span className="text-lg leading-7 text-[#544C45]">
              خبرنامه ژاکت
            </span>
          </div>

          <div className="pt-6">
            <div className="flex items-center rounded-md p-1 shadow-md bg-white h-12 w-full hover:ring-1 hover:ring-[#878F9B] transition-all duration-300">
              <span className="pr-[13px]">
                <HiEnvelope className="w-5 h-5 text-[#878F9B]" />
              </span>
              <Input
                className="flex-1"
                classNames={{
                  input: "text-sm text-[#76767C]",
                  inputWrapper:
                    "h-8 border-0 shadow-none bg-transparent",
                }}
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                variant="flat"
              />
              <Button
                isIconOnly
                className="bg-[#FFAE11] hover:bg-[#FFAE11]/80 text-white h-10 w-10"
                aria-label="Newsletter subscription"
              >
                <HiArrowLeft className="w-[15px] h-[15px]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact support section */}
        <div className="flex items-center w-full justify-between pt-7">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Image
                alt="ژاکت"
                width={30}
                height={30}
                priority
                src="/images/logo.svg"
                className="-translate-x-3 -translate-y-3 rounded-full border-2 border-white shadow"
              />
              <Image
                alt="ژاکت"
                width={36}
                height={36}
                priority
                src="/images/logo.svg"
                className="rounded-full border-2 border-white shadow"
              />
            </div>
            <div>
              <p className="text-base leading-7 text-[#424244]">
                سوالی دارید ؟ بپرسید
              </p>
              <p className="text-sm leading-7 text-[#878F9B]">
                ابتدا عضو شوید و سپس تیکت بفرستید
              </p>
            </div>
          </div>
          <Link href="/dashboard/tickets/new">
            <Button className="h-[40px] w-[70px] bg-[#F0F8FF] text-[#6097F3] hover:bg-[#F0F8FF]/80">
              ارسال تیکت
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
