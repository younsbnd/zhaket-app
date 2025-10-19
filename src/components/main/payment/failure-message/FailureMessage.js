
"use client";
import Link from 'next/link';
import React from 'react'
import { AiOutlineProduct } from 'react-icons/ai';
import { FaRedo, FaTimes } from 'react-icons/fa';

const FailureMessage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F5F6] py-12 px-6 text-center font-[iranyekan]">
            <div className="bg-white shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] rounded-xl p-10 max-w-lg w-full border border-[#F4F4F4]">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-[#FF6B6B]">
                    <FaTimes className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-[#2C3E50]">پرداخت ناموفق</h2>
                <p className="text-[#878F9B] mb-8 leading-relaxed text-base">
                    متأسفانه پرداخت شما تکمیل نشد، لطفاً دوباره تلاش کنید یا به صفحه‌ی اصلی برگردید.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Link
                        href="/cart"
                        className="flex items-center justify-center gap-2 h-[55px] rounded-lg bg-[#FF9606] hover:bg-[#EB8800] text-white font-semibold text-[13px] transition-colors duration-300 flex-1 cursor-pointer"
                    >
                        <FaRedo className="w-4 h-4" />
                        تلاش مجدد
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 h-[55px] rounded-lg bg-[#EAEEF380] hover:bg-[#878F9B] hover:text-white text-[#7E899B] font-bold text-[13px] transition-colors duration-300 flex-1 cursor-pointer"
                    >
                        <AiOutlineProduct className="w-4 h-4" />
                        صفحه اصلی
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FailureMessage