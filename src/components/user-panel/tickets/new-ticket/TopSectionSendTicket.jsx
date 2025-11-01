import React from "react";

const TopSectionSendTicket = () => {
  return (
    <div className="flex flex-col space-y-1.5 whitespace-pre-line border-b border-gray-200 md:p-7.5 md:pb-4 p-2.5 pb-4">
      <div className="text-right bg-transparent flex flex-row gap-3.5 items-center relative">
        <div className="text-right min-w-1 rounded-lg bg-orange-500 h-[calc(100%-12px)] absolute"></div>
        {/* top section title and description */}
        <div className="text-right bg-transparent space-y-4.5 pr-4.5">
          <p className="text-gray-700 tracking-tighter !leading-8 !text-[18px] font-extrabold">
            ارسال تیکت جدید
          </p>
          <p className="!text-xs font-bold text-gray-500 !leading-[22px] tracking-tight !mt-2 md:text-right !text-justify">
            حتما پیش از ارسال تیکت، سوالات رایج را مطالعه کرده و برای ثبت تیکت
            نیز با دقت کافی موضوع تیکت را انتخاب کنید تا تیکت شما به واحد مربوطه
            ارسال شود. <br /> برای ارسال تیکت جهت راهنمایی در رابطه با محصول
            خریداری شده، لازم است "ارتباط با پشتیبان محصول" و دسته بندی "اخذ
            راهنمایی در مورد محصول"را انتخاب کنید. <br /> برای ارتباط موثر با
            توسعه دهندگان لطفا موارد زیر را در نظر داشته باشید:
          </p>
        </div>
      </div>
      {/* top section tips */}
      <div className="text-right bg-[#6097F30F] px-4.5 py-3 pb-6 rounded-md mt-2">
        <p className="!text-[12.3px] font-bold text-gray-500 tracking-tight leading-7">
          1- رد و بدل کردن شماره تماس و یا راه های ارتباطی خارج از تیکت مانند
          آیدی تلگرام و… مانع از بررسی های تیم پشتیبانی بر روند تیکت های میان
          کاربر و توسعه دهنده است. همواره در بستر تیکت با توسعه دهنده در ارتباط
          باشید <br /> 2- درخواست های سفارشی سازی، نصب، افزایش سرعت و… شامل
          خدمات پشتیبانی 6 ماهه توسعه دهندگان نیست و برای انجام این خدمات
          میتوانید در تیکت از توسعه دهنده درخواست پروژه کنید تا با دریافت هزینه
          .برای شما انجام دهند <br /> 3- رد و بدل کردن شماره کارت/حساب و یا
          هرگونه انتقال پول خارج از درگاه های پرداخت رسمی ژاکت، تخلف می باشد
          لطفا در صورت مشاهده این مورد را .با ما در میان گذارید.
        </p>
      </div>
    </div>
  );
};

export default TopSectionSendTicket;
