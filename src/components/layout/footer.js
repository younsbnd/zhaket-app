"use client";

import { FaTelegramPlane, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiChevronDown, HiArrowLeft, HiX } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
import { Button, Input, Link } from "@heroui/react";
import Image from "next/image"; // استفاده از Image کامپوننت Next.js
import { useState } from "react";

// Disclosure Accordion Component (for mobile navigation)
function Disclosure({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Accordion Header Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-[51px] w-full items-center justify-between rounded-md bg-[#F9FAFC] p-[10px]"
      >
        <span className="text-base font-medium px-2 text-[#76767C]">{title}</span>
        {/* Chevron Icon with rotation animation */}
        <span className="flex items-center justify-center h-[30px] w-[30px] rounded-md border border-[#EEF0F4] bg-white">
          <HiChevronDown className={`w-4 h-4 text-[#878F9B] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </button>
      {/* Accordion Content */}
      {isOpen && <div className="mt-2 p-4 bg-white rounded-md">{children}</div>}
    </div>
  );
}

// Main Footer Component
export default function Footer() {
  const [showRatingPanel, setShowRatingPanel] = useState(false);

  // Footer navigation links configuration
  const footerLinks = [
    {
      title: "ارتباط با ژاکت", // Contact with Zhaket
      links: [
        { href: "/content/terms", label: "قوانین ژاکت" },
        { href: "/logo", label: "لوگو" },
        { href: "/content/about", label: "درباره ما" },
        { href: "/content/contact", label: "تماس با ما" },
      ],
    },
    {
      title: "خدمات", // Services
      links: [
        { href: "/landing/become-seller/", label: "فروشنده شوید" },
        { href: "/landing/zhaket-affiliate/", label: "همکاری در فروش ژاکت" },
        { href: "/web/zhaket-smart-updater", label: "بروزرسان هوشمند" },
        { href: "https://zhaket.com/landing/career/", label: "فرصت‌های شغلی" },
      ],
    },
    {
      title: "دسترسی سریع", // Quick Access
      links: [
        { href: "/web/category/wordpress-themes", label: "قالب وردپرس" },
        { href: "/web/category/wordpress-plugins", label: "افزونه وردپرس" },
        { href: "/web/category/ecommerce-woocommerce", label: "قالب فروشگاهی" },
        { href: "/web/category/corporate", label: "قالب شرکتی" },
      ],
    },
  ];

  // Social media links configuration
  const socials = [
    { 
      href: "http://instagram.com/zhaketcom", 
      icon: <FaInstagram className="w-[27px] h-[27px]" />, 
      label: "instagram" 
    },
    { 
      href: "https://linkedin.com/company/zhaket", 
      icon: <FaLinkedin className="w-[21px] h-[21px]" />, 
      label: "linkedin" 
    },
    { 
      href: "https://t.me/s/zhaketcom", 
      icon: <FaTelegramPlane className="w-[20px] h-[20px]" />, 
      label: "telegram" 
    },
  ];

  return (
    <>
      <footer className="flex flex-col items-center justify-center mx-auto w-full max-w-[1279px] p-4 md:px-0 md:pt-0">
        
        {/* Mobile Header Section: Logo and Social Media Icons */}
        <div className="flex items-center w-full justify-between pt-10 md:hidden">
          <Link href="/">
            <Image 
              alt="ژاکت" 
              width={60} 
              height={43} 
              src="/images/logo.svg" 
              className="min-h-[39px] min-w-[55px]" 
            />
          </Link>
          
          {/* Mobile Social Media Icons */}
          <div className="flex gap-3">
            {socials.map((social) => (
              <Link 
                key={social.label} 
                target="_blank" 
                aria-label={social.label} 
                className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC] group/item" 
                href={social.href}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Accordion Navigation */}
        <div className="flex flex-col items-center w-full gap-[10px] pt-6 md:hidden">
          {footerLinks.map((section) => (
            <Disclosure key={section.title} className={""} title={section.title}>
              <div className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-sm  text-[#76767C] hover:text-[#FF9606]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </Disclosure>
          ))}
        </div>

        {/* Desktop Layout Section */}
        <div className="justify-between md:flex md:pt-[50px]">
          
          {/* Desktop Navigation Columns */}
          <div className="hidden md:grid md:grid-cols-3 w-[calc(100%_-_377px)] pt-[25px] gap-x-10">
            {footerLinks.map((section, index) => (
              <div key={section.title} className="flex w-full flex-col items-start gap-4">
                
                {/* Logo in first column only */}
                {index === 0 && (
                  <Link href="/">
                    <Image 
                      alt="ژاکت" 
                      width={60} 
                      height={43} 
                      src="/images/logo.svg" 
                      className="min-h-[31px] min-w-[44px]" 
                      style={{ width: "auto" }} 
                    />
                  </Link>
                )}
                
                {/* Section Title */}
                <p className={`text-base text-[#424244] leading-7 ${index === 0 ? "hidden" : ""} md:block`}>
                  {section.title}
                </p>
                
                {/* Section Links */}
                <div className="flex flex-col items-start gap-2">
                  {section.links.map((link) => (
                    <p key={link.href} className="text-sm leading-7 text-[#76767C] transition duration-300">
                      <Link href={link.href}>{link.label}</Link>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter and Contact Section */}
          <div className="flex flex-col md:w-[377px]">
            
            {/* Newsletter Subscription Card */}
            <div className="mt-4 h-[159px] rounded-xl border-[3px] border-white bg-[linear-gradient(233.69deg,#FFDAA2_-5.92%,#FFF3E0_17.7%)] p-7 shadow-[0px_5px_25px_0px_rgba(255,107,1,0.08)]">
              
              {/* Newsletter Header */}
              <div className="flex items-center gap-3 pb-2">
                <Image alt="ژاکت" width={22} height={22} src="/images/logo.svg" />
                <span className="text-lg leading-7 text-[#544C45]">خبرنامه ژاکت</span>
              </div>
              
              {/* Email Input and Subscribe Button */}
              <div className="pt-6">
                <div className="flex items-center rounded-md p-1 shadow-md bg-white h-12 w-full hover:ring-1 hover:ring-[#878F9B] transition-all duration-300">
                  <span className="pr-[13px]">
                    <HiEnvelope className="w-5 h-5 text-[#878F9B]" />
                  </span>
                  <Input 
                    className="flex-1" 
                    classNames={{ 
                      input: "text-sm text-[#76767C]", 
                      inputWrapper: "h-8 border-0 shadow-none bg-transparent" 
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
            
            {/* Contact Support Section */}
            <div className="flex items-center w-full justify-between pt-7">
              <div className="flex items-center gap-3">
                
                {/* Avatar Stack */}
                <div className="flex items-center">
                  <Image 
                    alt="ژاکت" 
                    width={30} 
                    height={30} 
                    src="/images/logo.svg" 
                    className="-translate-x-3 -translate-y-3 rounded-full border-2 border-white shadow-[0px_10px_25px_0px_rgba(0,0,0,0.07)]" 
                    style={{ width: "auto" }} 
                  />
                  <Image 
                    alt="ژاکت" 
                    width={36} 
                    height={36} 
                    src="/images/logo.svg" 
                    className="rounded-full border-2 border-white shadow-[0px_10px_25px_0px_rgba(0,0,0,0.07)]" 
                    style={{ width: "auto" }} 
                  />
                </div>
                
                {/* Contact Text */}
                <div>
                  <p className="text-base leading-7 text-[#424244]">سوالی دارید ؟ بپرسید</p>
                  <p className="text-sm leading-7 text-[#878F9B]">ابتدا عضو شوید و سپس تیکت بفرستید</p>
                </div>
              </div>
              
              {/* Contact Button */}
              <Link href="/dashboard/tickets/new">
                <Button className="h-[40px] w-[70px] bg-[#F0F8FF] text-[#6097F3] hover:bg-[#F0F8FF]/80">
                  پیام
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="flex items-center justify-center pt-10">
          <div className="items-center justify-between gap-[50px] rounded-lg bg-[#F9FAFC] p-[23px] text-[#5D6877] md:flex">
            
            {/* Mobile About Text */}
            <p className="text-sm leading-7 font-medium text-[#5D6877] md:hidden">
              مرجع وردپرس فارسی و رهبر بازار اولین پلتفرم ارائه دهنده خدمات و محصولات دیجیتال در ایران که با گردهم آوری منابع انسانی توانمند و برجسته بدنبال خلق ارزش برای ذینفعان خود می باشد.
            </p>
            
            {/* Mobile Extended Text and Trust Badge */}
            <div className="flex items-center gap-[30px] pt-[10px] md:hidden">
              <p className="text-sm leading-7 font-medium text-[#5D6877]">
                ژاکت دارای 6 فاز توسعه در سمت محصول با تیم قدرتمند فنی و تیم کارکشته و با تجربه بازاریابی برای افزایش سهم بازار حداکثری خود است.
              </p>
              
              {/* Trust Badge Placeholder (Mobile) */}
              <div className="flex items-center min-w-[82px] rounded-md bg-white p-[10px] shadow-[0px_5px_15px_0px_rgba(73,75,84,0.06)]">
                <Link referrerPolicy="origin" target="_blank" href="">
                  <span className="inline-block h-[71px] w-[58px]" aria-hidden="true" />
                </Link>
              </div>
            </div>
            
            {/* Desktop About Text */}
            <p className="hidden md:block text-sm leading-7 font-medium text-[#5D6877]">
              مرجع وردپرس فارسی و رهبر بازار اولین پلتفرم ارائه دهنده خدمات و محصولات دیجیتال در ایران که با گردهم آوری منابع انسانی توانمند و برجسته بدنبال خلق ارزش برای ذینفعان خود می باشد. ژاکت دارای 6 فاز توسعه در سمت محصول با تیم قدرتمند فنی و تیم کارکشته و با تجربه بازاریابی برای افزایش سهم بازار حداکثری خود است.
            </p>
            
            {/* Trust Badge Placeholder (Desktop) */}
            <Link referrerPolicy="origin" target="_blank" href="">
              <span 
                className="hidden min-w-[67px] md:block" 
                aria-hidden="true" 
                style={{ display: 'inline-block', width: 67, height: 71 }} 
              />
            </Link>
          </div>
        </div>

        {/* Bottom Copyright and Social Section */}
        <div className="flex items-center justify-center pt-6 pb-[10px] md:justify-between">
          
          {/* Copyright and Hosting Info */}
          <div className="flex flex-col-reverse items-center md:flex-row">
            <p className="text-sm leading-7 font-medium text-center text-[#7E899B]">
              تمامی حقوق برای ژاکت محفوظ است
            </p>
            
            {/* Divider */}
            <div className="mx-2 hidden h-4 w-[1px] bg-[#E1E3E5] md:inline"></div>
            
            {/* Hosting Information */}
            <div className="flex items-center">
              <p className="text-sm leading-7 font-medium text-center text-[#7E899B]">
                میزبانی بر بستر سرورهای اختصاصی
              </p>
              <Button variant="light" className="text-sm text-[#FF9606] hover:text-[#EB8800] px-0.5">
                ژاکت کلود
              </Button>
            </div>
          </div>
          
          {/* Desktop Social Media Icons */}
          <div className="hidden md:block md:py-2">
            <div className="flex gap-3">
              {socials.map((social) => (
                <Link 
                  key={social.label} 
                  target="_blank" 
                  aria-label={social.label} 
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC] group/item" 
                  href={social.href}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Rating Panel Modal */}
      {showRatingPanel && (
        <div className="flex flex-col justify-between overflow-hidden border-none fixed bottom-4 left-4 z-[9999999999] w-[370px] rounded-md bg-white p-1 shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] transition-transform duration-300">
          
          {/* Rating Panel Header */}
          <div className="flex justify-between rounded-md bg-[linear-gradient(180deg,#6097f324_0%,rgba(96,151,243,0)_100%)] p-4">
            <div>
              <p className="font-bold text-[15px] text-[#424244]">
                به محصولات خریداری شده، امتیاز دهید
              </p>
              <p className="text-xs leading-7 text-[#76767C]">
                با ثبت امتیاز، به بهبود محصولات و خدمات کمک کنید.
              </p>
            </div>
            <Button isIconOnly onClick={() => setShowRatingPanel(false)} className="h-10 w-10 bg-white text-gray-100 hover:bg-[#76767c] hover:text-white">
              <HiX className="w-[22px] h-[22px]" />
            </Button>
          </div>
          <section className="p-4"></section>
          <div className="p-4 flex items-center gap-2 pt-0">
            <Button variant="bordered" className="w-[84px] text-[#76767C] border-[#E5E8EB] bg-white hover:bg-[#76767c] hover:text-white">بعدا لطفاً !</Button>
            <Button className="w-[84px] bg-[#6097F3] text-white hover:bg-[#F0F8FF] hover:text-[#6097F3]">ثبت امتیاز</Button>
          </div>
        </div>
      )}
    </>
  );
}
