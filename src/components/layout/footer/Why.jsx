"use client";
import Image from "next/image";
import { BiLockAlt } from "react-icons/bi";

export default function WhyUsSection() {
  return (
    <section className='bg-white py-10' dir='ltr'>
      <div className='container mx-auto px-4'>
        <div className='bg-[#11131B] rounded-2xl shadow-lg p-8 grid grid-cols-2 lg:grid-cols-5 gap-8 text-center lg:text-right'>
          {/* Column 1 */}
          <div className='flex-col items-center lg:items-end gap-3 col-span-2 lg:col-span-1 lg:hidden flex'>
            <h3 className='text-white text-xl font-bold'>چرا از ژاکت بخرم؟</h3>
            <p className='text-gray-300 text-sm'>
              معتبرترین سامانه خرید افزونه و پلاگین فارسی
            </p>
          </div>
          <div className='flex flex-col items-center lg:items-start gap-3'>
            <div className='flex flex-col gap-2'>
              <span className='px-3 py-1 rounded-md bg-gradient-to-r from-purple-400 to-pink-500 text-white text-xs font-semibold flex items-center gap-1'>
                <Image
                  src='/layout/black.svg'
                  alt='guard'
                  width={14}
                  height={14}
                />
                GUARD <BiLockAlt />
              </span>
              <span className='px-3 py-1 rounded-md bg-gradient-to-r from-yellow-400 to-green-600 text-white text-xs font-semibold flex items-center gap-1'>
                <Image
                  src='/layout/black.svg'
                  alt='updater'
                  width={14}
                  height={14}
                />
                UPDATER
              </span>
            </div>
            <p className='text-gray-300 text-sm'>امنیت و بروزرسانی</p>
          </div>

          {/* Column 2 */}
          <div className='flex flex-col items-center gap-3'>
            <Image
              src='/layout/guarantee.svg'
              alt='refund'
              width={40}
              height={40}
            />
            <p className='text-gray-300 text-sm'>ضمانت بازگشت وجه</p>
          </div>

          {/* Column 3 */}
          <div className='flex flex-col items-center gap-3'>
            <div className='flex items-center gap-2 text-white text-2xl font-bold'>
              +۳۱۰۰
            </div>
            <div className='flex items-center gap-1'>
              <Image
                src='/layout/zhk-green-sm.896a0f1e.svg'
                alt='p1'
                width={10}
                height={10}
              />
              <Image
                src='/layout/verified.48b00f7a.svg'
                alt='p2'
                width={10}
                height={10}
              />
              <Image
                src='/layout/ir-map.6260853a.svg'
                alt='p3'
                width={10}
                height={10}
              />
            </div>
            <p className='text-gray-300 text-sm'>محصول مختلف</p>
          </div>

          {/* Column 4 */}
          <div className='flex flex-col items-center gap-3'>
            <div className='text-white text-2xl font-bold'>+۴.۸</div>
            <div className='flex'>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='orange'
                    className='w-5 h-5'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.058 3.26a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.057 3.26c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.057-3.26a1 1 0 00-.364-1.118L2.98 8.687c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.058-3.26z' />
                  </svg>
                ))}
            </div>
            <p className='text-gray-300 text-sm'>رضایت خرید کاربران</p>
          </div>

          {/* Column 5 (Title) - Full width on mobile */}
          <div className='flex-col items-center lg:items-end gap-3 col-span-2 lg:col-span-1 lg:flex hidden'>
            <h3 className='text-white text-xl font-bold'>چرا از ژاکت بخرم؟</h3>
            <p className='text-gray-300 text-sm'>
              معتبرترین سامانه خرید افزونه و پلاگین فارسی
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
