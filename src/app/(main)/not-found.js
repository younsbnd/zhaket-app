import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center error-page-bg-mobile h-screen w-screen flex-col gap-2 text-[#1F2025] relative overflow-hidden">
      {/* Background 404 Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="relative w-full max-w-[600px] h-[330px]">
          <Image
            alt="404"
            src="/images/404-zhaket.svg"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center z-20 flex-col px-4">
        {/* Logo */}
        <Link href="/" className="mb-7">
          <Image
            alt="ژاکت"
            width={114}
            height={82}
            className="min-h-[82px] min-w-[114px] object-contain"
            src="/images/logo.svg"
            priority
          />
        </Link>

        {/* Title */}
        <h1 className="text-[#1F2025] text-2xl md:text-3xl font-bold text-center">
          صفحه مورد نظر پیدا نشد
        </h1>

        {/* Description */}
        <p className="transition duration-300 text-sm leading-7 mt-2 mb-[18px] text-[#424244] text-center">
          معتبرترین سامانه خرید افزونه و پلاگین فارسی
        </p>

        {/* Back Button */}
        <Link href="/">
          <div className="flex items-center justify-center h-[55px] w-[186px] rounded-lg bg-[#FFAE11] text-base font-bold text-white transition duration-300 hover:bg-[#EB8800] cursor-pointer">
            بازگشت به ژاکت
          </div>
        </Link>
      </div>
    </div>
  );
}
