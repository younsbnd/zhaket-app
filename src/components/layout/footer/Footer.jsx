"use client";

import Image from "next/image";
import Link from "next/link";
import {
  aboutLinks,
  footerLinks,
  serviceLinks,
  socialLinks,
} from "../../../constants/footerData";
import ControlledInput from "@/components/shared/forms/ControlledInput";
import { useForm } from "react-hook-form";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import icon from "../../../app/icon.png";
import WhyUsSection from "./Why";
export default function Footer() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
  });
  return (
    <div className=''>
      <div className='lg:px-10 lg:py-5 md:px-5 px-1 py-2 text-gray-800 border-t border-gray-200'>
        <WhyUsSection />
        <div className='container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Column 1 */}
          <div>
            <Image
              src={"/logo.svg"}
              width={60}
              height={60}
              alt='image'
              className='object-cover'
            />
            <ul className='space-y-2 text-sm'>
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className='hover:text-primary text-zhaket-secondary/70'>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className='font-bold text-lg mb-4 text-zhaket-secondary'>
              خدمات
            </h3>
            <ul className='space-y-2 text-sm'>
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className='hover:text-primary text-zhaket-secondary/70'>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className='font-bold text-lg mb-4 text-zhaket-secondary'>
              دسترسی سریع
            </h3>
            <ul className='space-y-2 text-sm'>
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className='hover:text-primary text-zhaket-secondary/70'>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className='rounded-xl shadow-sm'>
            <form className='overflow-hidden flex flex-col gap-5 bg-zhaket-primary/10 rounded-lg p-6'>
              <h3 className='font-normal flex gap-2 text-lg mb-3 text-zhaket-secondary'>
                <Image
                  src={"/layout/black.svg"}
                  alt='logo'
                  width={15}
                  height={15}
                  className='object-cover w-6 h-6'
                />
                خبرنامه ژاکت
              </h3>

              <div className='flex relative bg-white'>
                <ControlledInput
                  name='email'
                  control={control}
                  placeholder='ایمیل خودرا وارد کنید'
                  rules={{ required: "ایمیل باید وارد شود" }}
                  errors={errors}
                />
                <button
                  type='submit'
                  className='bg-zhaket-primary absolute left-2 top-2 bottom-2 text-zhaket-bg px-3 rounded-md text-2xl font-semibold hover:bg-zhaket-primary/90 transition-colors duration-200'>
                  {" "}
                  <HiMiniArrowSmallLeft />
                </button>
              </div>
            </form>
            <div className='text-sm flex items-center gap-1 p-3'>
              {[
                "/layout/contact-avatar-1.jpg",
                "/layout/contact-avatar-2.jpg",
              ].map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt='contact-avatar'
                  width={20}
                  height={20}
                  className={`w-6 h-6 rounded-full ${
                    index === 1 ? "relative -right-[10px]" : ""
                  }`}
                />
              ))}

              <p className='text-[12px] ml-1.5'>
                سوالی دارید ؟ بپرسید
                <br /> ابتدا عضو شوید و سپس تیکت بفرستی
              </p>
              <Link
                href={"/"}
                className='p-2 rounded bg-blue-100 text-blue-600'>
                پیام
              </Link>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-2 md:mx-10 mx-5 my-5 bg-zhaket-secondary/5 p-5 rounded text-[14px]'>
          <p className='leading-7 text-zhaket-secondary/80'>
            مرجع وردپرس فارسی و رهبر بازار اولین پلتفرم ارائه دهنده خدمات و
            محصولات دیجیتال در ایران که با گردهم آوری منابع انسانی توانمند و
            برجسته بدنبال خلق ارزش برای ذینفعان خود می باشد. ژاکت دارای 6 فاز
            توسعه در سمت محصول با تیم قدرتمند فنی و تیم کارکشته و با تجربه
            بازاریابی برای افزایش سهم بازار حداکثری خود است.
          </p>
          <Image
            src={"/layout/eNAMAD.png"}
            width={100}
            alt='eNAMAD logo'
            height={100}
            className='object-cover'
          />
        </div>
        {/* Bottom Section */}
        <div className='border-t border-gray-200 mt-6 py-4'>
          <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4'>
            {/* Social Icons */}
            <div className='flex items-center text-zhaket-secondary/70'>
              <p className='px-2 border-l border-zhaket-secondary/50 ml-1'>
                تمامی حقوق برای ژاکت محفوظ است
              </p>
              <p>
                میزبانی بر بستر سرورهای اختصاصی{" "}
                <Link href={"/"} className='text-zhaket-primary font-semibold'>
                  ژاکت کلود
                </Link>
              </p>{" "}
            </div>
            <div className='flex gap-4 text-gray-600'>
              {socialLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className='hover:text-primary transition-colors text-zhaket-secondary/60'>
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
