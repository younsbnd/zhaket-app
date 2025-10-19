"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiEnvelope } from "react-icons/hi2";
import { HiArrowLeft } from "react-icons/hi";
import { Button, Input } from "@heroui/react";

/**
 * FooterDesktopSection component
 * Renders desktop footer with navigation links, newsletter signup, and contact section
 */
export default function FooterDesktopSection({ footerLinks }) {
  return (
    <div className="justify-between md:flex md:pt-[50px]">
      {/* Navigation columns for desktop */}
      <div className="hidden md:grid md:grid-cols-3 w-[calc(100%_-_377px)] pt-[25px] gap-x-10">
        {footerLinks.map((section, index) => (
          <div
            key={section.title}
            className="flex w-full flex-col items-start gap-4"
          >
            {/* Logo in first column */}
            {index === 0 && (
              <Link href="/" aria-label="صفحه اصلی ژاکت">
                <Image
                  alt="لوگو ژاکت"
                  width={60}
                  height={43}
                  src="/images/logo.svg"
                  className="min-h-[31px] min-w-[44px] transition-opacity duration-300 hover:opacity-80"
                  priority
                />
              </Link>
            )}

            {/* Section title */}
            <h3
              className={`text-base text-[#424244] leading-7 font-medium ${index === 0 ? "hidden" : ""
                } md:block`}
            >
              {section.title}
            </h3>

            {/* Section links */}
            <nav className="flex flex-col items-start gap-2" aria-label={`${section.title} لینک‌ها`}>
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm leading-7 text-[#76767C] transition-colors duration-300 hover:text-[#FF9606]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Newsletter and contact section */}
      <div className="flex flex-col md:w-[377px]">
        {/* Newsletter subscription card */}
        <div className="mt-4 h-[159px] rounded-xl border-[3px] border-white bg-[linear-gradient(233.69deg,#FFDAA2_-5.92%,#FFF3E0_17.7%)] p-7 shadow-[0px_5px_25px_0px_rgba(255,107,1,0.08)]">
          <div className="flex items-center gap-3 pb-2">
            <Image
              alt="لوگو ژاکت"
              priority
              width={22}
              height={22}
              src="/images/logo.svg"
              style={{ width: 22, height: 22 }}
            />
            <span className="text-lg leading-7 text-[#544C45] font-medium">
              خبرنامه ژاکت
            </span>
          </div>

          <div className="pt-6">
            <div className="flex items-center rounded-md p-1 shadow-md bg-white h-12 w-full hover:ring-1 hover:ring-[#878F9B] transition-all duration-300">
              <span className="pr-[13px]" aria-hidden="true">
                <HiEnvelope className="w-5 h-5 text-[#878F9B]" />
              </span>
              <Input
                className="flex-1"
                classNames={{
                  input: "text-sm text-[#76767C]",
                  inputWrapper: "h-8 border-0 shadow-none bg-transparent",
                }}
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                variant="flat"
                aria-label="ایمیل برای عضویت در خبرنامه"
              />
              <Button
                isIconOnly
                className="bg-[#FFAE11] hover:bg-[#FFAE11]/80 text-white h-10 w-10 transition-colors duration-300"
                aria-label="عضویت در خبرنامه"
              >
                <HiArrowLeft className="w-[15px] h-[15px]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact support section */}
        <div className="flex items-center w-full justify-between pt-7">
          <div className="flex items-center gap-3">
            {/* Support avatars */}
            <div className="flex ml-4 items-center" role="img" aria-label="تیم پشتیبانی">
              <Image
                alt="پشتیبانی ژاکت"
                width={30}
                height={30}
                priority
                src="/images/footer/contact-avatar-2.dccc43be.jpg"
                className="-translate-x-3 -translate-y-3 rounded-full border-2 border-white shadow"
              />
              <Image
                alt="پشتیبانی ژاکت"
                width={36}
                height={36}
                priority
                src="/images/footer/contact-avatar-1.61401764.png"
                className="rounded-full border-2 border-white shadow"
              />
            </div>

            {/* Support text */}
            <div>
              <p className="text-base leading-7 text-[#424244] font-medium">
                سوالی دارید؟ بپرسید
              </p>
              <p className="text-sm leading-7 text-[#878F9B]">
                ابتدا عضو شوید و سپس تیکت بفرستید
              </p>
            </div>
          </div>

          {/* Contact button */}
          <Link href="/dashboard/tickets/new">
            <Button className="h-[40px] w-[70px] bg-[#F0F8FF] text-[#6097F3] hover:bg-[#F0F8FF]/80 transition-colors duration-300 font-medium">
              ارسال تیکت
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
