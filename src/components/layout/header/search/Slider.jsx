"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../../../constants/searchData";

function SearchSlider({ data }) {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;

    const mouseDownHandler = (e) => {
      isDown.current = true;
      slider.classList.add("active");
      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
      slider.style.cursor = "grabbing";
    };

    const mouseLeaveHandler = () => {
      isDown.current = false;
      slider.classList.remove("active");
      slider.style.cursor = "grab";
    };

    const mouseUpHandler = () => {
      isDown.current = false;
      slider.classList.remove("active");
      slider.style.cursor = "grab";
    };

    const mouseMoveHandler = (e) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 2; // scroll-fast multiplier
      slider.scrollLeft = scrollLeft.current - walk;
    };

    slider.addEventListener("mousedown", mouseDownHandler);
    slider.addEventListener("mouseleave", mouseLeaveHandler);
    slider.addEventListener("mouseup", mouseUpHandler);
    slider.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      slider.removeEventListener("mousedown", mouseDownHandler);
      slider.removeEventListener("mouseleave", mouseLeaveHandler);
      slider.removeEventListener("mouseup", mouseUpHandler);
      slider.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      ref={sliderRef}
      className='hide-scrollbar flex gap-6 overflow-x-auto whitespace-nowrap px-6 py-4 scroll-smooth snap-x snap-mandatory touch-pan-x cursor-grab'
      style={{
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
      }}>
      {data.map((item, i) => (
        <motion.div
          variants={itemVariants}
          key={i}
          className='flex-shrink-0 flex items-center gap-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out px-4 py-3 snap-start min-w-[120px] cursor-pointer select-none'>
          <Link href={item.url} key={i} title={item.title}>
            {item.image && (
              <div className='relative md:w-10 md:h-10 w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-gray-200'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover'
                  sizes='40px'
                  priority={i < 3} // prioritize first images for speed
                />
              </div>
            )}
            <span className='md:text-sm text-[12px] font-medium text-gray-800 truncate'>
              {item.image ? (
                <span>{item.title.slice(0, 10)}...</span>
              ) : (
                item.title
              )}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default SearchSlider;
