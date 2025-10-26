"use client";
import { Card, CardBody } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const EmptyComment = () => {
  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <Card className="glass">
          {/* card body */}
          <CardBody className="p-6 md:p-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-3">
                <FiAlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-red-300 mx-auto" />
                {/* empty comment message */}
                <p className="text-white text-sm md:text-base font-semibold">
                  نظر مورد نظر یافت نشد
                </p>
                {/* back to comments list */}
                <Link
                  href="/admin/comments"
                  className="inline-block text-white text-sm md:text-base bg-gradient-to-l from-blue-600 to-indigo-700 px-4 py-2 rounded-md"
                >
                  بازگشت به لیست نظرات
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EmptyComment;
