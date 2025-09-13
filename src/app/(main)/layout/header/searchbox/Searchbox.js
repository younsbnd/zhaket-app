"use client";

import React from "react";
import { Modal, ModalContent } from "@heroui/react";
import { IoSearchOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import ControlledInput from "@/components/shared/forms/ControlledInput";
import { FaFire } from "react-icons/fa";
import Image from "next/image";

/**
 * SearchModal
 * 
 * Displays a centered modal containing a HeroUI-based search form.
 * Includes an inline search icon, polished Tailwind styles, and validations.
 */
export default function SearchModal({ isOpen, onClose }) {
  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle submission
  const onSubmit = (data) => {
    console.log("🔍 Search value:", data.searchQuery);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        base: "overflow-hidden bg-white p-0 text-right align-middle shadow-xl md:p-6 rounded-md w-full max-w-[680px]",
      }}
    >
      <ModalContent>
        <div className="flex flex-col gap-2.5 text-right">
          {/* Search Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-5 pt-5 w-full max-w-[640px] mx-auto"
          >
            <div className="relative w-full mt-4
            ">
              {/* Search Icon (inside input) */}
              <IoSearchOutline
                size={22}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#878F9B] pointer-events-none"
              />

              {/* ControlledInput from HeroUI */}
              <ControlledInput
                name="searchQuery"
                control={control}
                placeholder="مثلا قالب وودمارت"
                errors={errors}
                rules={{
                  required: "Search field cannot be empty",
                }}
                variant="bordered"
                color="default"
                classNames={{
                  inputWrapper: "h-[56px] pr-10 rounded-lg border border-[#E5E8EB] shadow-sm hover:border-[#FF9606] focus-within:border-[#FF9606] focus-within:shadow-[0px_8px_20px_-6px_rgba(0,0,0,0.15)] transition-all duration-150",
                  input: "text-sm text-[#76767C] bg-white placeholder:text-[#A1A1A5]",
                }}
              />
            </div>
          </form>

          {/* Example for suggestion area (ready for real data) */}
          <div className="px-5 pb-6">
            <h4 className="flex items-center gap-2 text-sm font-medium text-[#5B5C60] mb-3">
             <FaFire/>
              پیشنهاد ژاکت
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {/* Suggestion Card Example */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F7F8F9] hover:bg-[#FFF5E6] transition">
                <Image
                  src="/images/header/677e2df8cc95f22932086ea2.png"
                  alt="افزونه المنتور پرو"
                  width={50}
                  height={50}
                  className="object-cover rounded-[10px]"
                />
                <p className="text-sm text-[#5B5C60] truncate">
                  افزونه المنتور پرو | پلاگین Elementor Pro
                </p>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
