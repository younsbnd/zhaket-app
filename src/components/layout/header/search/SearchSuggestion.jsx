"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  ourSuggestion,
} from "../../../../constants/searchData";
import SearchSlider from "./Slider";
import { categories } from "../../../../constants/headerData";
import { ImFire } from "react-icons/im";
export default function SearchSuggestion() {
  const categoryTitles = categories.map((cat) => ({
    title: cat.title,
    url: cat.url,
  }));

  return (
    <motion.div
      className='mt-5'
      initial='hidden'
      animate='visible'
      variants={containerVariants}>
      <div className=''>
        <motion.p
          variants={itemVariants}
          className='font-semibold text-black/70 flex items-center gap-2'>
          <ImFire className='text-zhaket-primary' />
          پیشنهادات ژاکت
        </motion.p>
        <SearchSlider data={ourSuggestion} />
      </div>
      <div className='mt-5'>
        <motion.p
          variants={itemVariants}
          className='font-semibold text-black/70 flex items-center gap-2'>
          <ImFire className='text-zhaket-primary' />
          محبوب ترین جستجو ها
        </motion.p>
        <SearchSlider data={categoryTitles} />
      </div>
    </motion.div>
  );
}
