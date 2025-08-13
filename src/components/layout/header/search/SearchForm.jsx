"use client";

import { useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TfiClose } from "react-icons/tfi";
import { motion } from "framer-motion";
import ControlledInput from "@/components/shared/forms/ControlledInput";
import { useForm } from "react-hook-form";

export default function SearchForm({
  query,
  setQuery,
  onSubmit,
  onClose,
  showBtnMore,
  autoFocus = true,
}) {
  const formRef = useRef(null);
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed);
    }
  };

  return (
    <motion.form
      ref={formRef}
      role='search'
      aria-label='جستجو'
      className='relative bg-white pb-1.5'
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}>
      {/* Input */}
      <div className='relative'>
        {/* Close Button */}
        <motion.button
          type='button'
          aria-label='بستن'
          onClick={onClose}
          className='absolute left-2 -translate-y-1/2 top-1/2 p-1 text-black/50 hover:text-black transition'>
          <TfiClose size={20} />
        </motion.button>
        <ControlledInput
          name={query}
          control={control}
          placeholder='جستجو کنید ...'
          rules={{ required: "جستجو کنید ..." }}
          errors={errors}
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
    
        {/* Search Icon */}
        <motion.button
          type='submit'
          aria-label='جستجو'
          className='absolute sm:flex hidden right-3 -translate-y-1/2 top-1/2 p-1 text-black/50 hover:text-black transition'
          onClick={handleSubmit}>
          <BiSearchAlt size={20} />
        </motion.button>
      </div>
      {showBtnMore && (
        <motion.button
          type='button'
          onClick={() => onSubmit(query.trim())}
          className='ml-auto block my-3 font-semibold cursor-pointer text-black/70 hover:text-black/90 transition-all text-sm border-b border-black/50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}>
          نمایش نتایج بیشتر
        </motion.button>
      )}
    </motion.form>
  );
}
