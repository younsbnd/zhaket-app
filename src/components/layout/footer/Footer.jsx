import Image from "next/image";
import Link from "next/link";
import { aboutLinks, footerLinks, serviceLinks, socialLinks } from "../../../constants/footerData";

export default function Footer() {
  return (
    <div className=''>
      <div className='lg:px-10 lg:py-5 md:px-5 px-1 py-2 text-gray-800 border-t border-gray-200'>
        <div className='container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8'>
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
          <div className='bg-zhaket-primary/10 p-6 rounded-xl shadow-sm'>
            <h3 className='font-bold text-lg mb-3 text-zhaket-secondary'>
              عضویت در خبرنامه
            </h3>

            <p className='text-sm mb-4 text-gray-600 leading-relaxed'>
              برای دریافت آخرین تخفیف‌ها و محصولات جدید، ایمیل خود را وارد کنید:
            </p>

            <form className='flex overflow-hidden rounded-lg border border-gray-300 focus-within:border-zhaket-primary transition-colors duration-200'>
              <input
                type='email'
                placeholder='ایمیل شما'
                className='flex-grow p-3 text-sm focus:outline-none bg-white text-gray-800 placeholder-gray-400'
              />
              <button
                type='submit'
                className='bg-zhaket-primary text-zhaket-bg px-6 text-sm font-semibold hover:bg-zhaket-primary/90 transition-colors duration-200'>
                ارسال
              </button>
            </form>
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
            src={"/eNAMAD.png"}
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

            {/* Copyright */}
            <p className='text-sm font-extralight text-zhaket-secondary/70'>
              © {new Date().getFullYear()} تمامی حقوق محفوظ است
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
