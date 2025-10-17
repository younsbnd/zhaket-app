"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CARD_ANIMATION,
  CONTENT_ANIMATION,
  IMAGE_ANIMATION,
} from "@/constants/main/Prodectdesign";
import ProductActions from "./ui/ProductActions";
import ProductStats from "./ui/ProductStats";

const formatNumber = (num) => new Intl.NumberFormat("fa-IR").format(num || 0);

const cleanHTML = (html) => {
  if (!html) return "";
  try {
    return (
      new DOMParser().parseFromString(html, "text/html").body.textContent || ""
    );
  } catch {
    return "";
  }
};

const ProductCard = ({ product = {}, viewMode = "grid" }) => {
  const {
    slug,
    title,
    price = 0,
    rating = {},
    salesCount = 0,
    images = {},
    author = {},
    description = "",
    demoUrl,
  } = product;

  const desc = useMemo(() => cleanHTML(description), [description]);

  if (!slug || !title) return null;

  const link = `/category/web/${slug}`;
  const img = images?.url || product.image || "/images/default-product.svg";
  const demo = demoUrl || "#";
  const isGrid = viewMode === "grid";

  const PriceSection = () => (
    <div className="flex items-center gap-1">
      <span className="font-bold text-xl text-[#424244]">
        {formatNumber(price)}
      </span>
      <span className="text-[13px] text-[#76767C]">تومان</span>
    </div>
  );

  if (isGrid) {
    return (
      <motion.div
        className="group relative flex flex-col aspect-[0.74] max-w-[304px] rounded-md border border-[#E5E8EB] shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] overflow-hidden"
        {...CARD_ANIMATION}
      >
        <Link href={link}>
          <motion.div className="relative overflow-hidden" {...IMAGE_ANIMATION}>
            <Image
              src={img}
              alt={title}
              width={272}
              height={272}
              className="w-full object-cover"
              priority
            />
          </motion.div>
        </Link>
        <motion.section
          className="absolute bottom-0 md:bottom-[-62px] w-full bg-white p-5 transition-all group-hover:bottom-0"
          {...CONTENT_ANIMATION}
        >
          <Link href={link}>
            <p className="font-bold text-base text-[#424244] min-h-[60px] pb-2 line-clamp-2 group-hover:text-[#ff9606] transition-colors">
              {title}
            </p>
          </Link>
          <div className="flex items-end justify-between pb-4">
            <PriceSection />
            <ProductStats rating={rating} salesCount={salesCount} isGrid />
          </div>
          <ProductActions demoLink={demo} isGrid />
        </motion.section>
      </motion.div>
    );
  }

  return (
    <div className="rounded-xl border border-[#F4F4F4] shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] overflow-hidden">
      <section className="flex gap-4 p-4">
        <Link href={link} className="flex-shrink-0">
          <Image
            src={img}
            alt={title}
            width={250}
            height={250}
            className="rounded-lg object-cover shadow-[0px_5px_10px_0px_#0000000D]"
          />
        </Link>
        <div className="flex-1 flex flex-col justify-around">
          <div className="flex items-center gap-8">
            <div>
              <Link
                href={link}
                className="hover:text-[#ff9606] transition-colors"
              >
                <h3 className="text-lg font-bold line-clamp-1">{title}</h3>
              </Link>
              <div className="flex items-center gap-3 mt-4 pb-2">
                <Image
                  src={author.avatar || "/images/default-avatar.svg"}
                  alt={author.name || "Author"}
                  width={30}
                  height={30}
                  className="rounded-full border-2 border-white"
                />
                <span className="text-sm text-[#878F9B] truncate">
                  توسعه دهنده: {author.name}
                </span>
              </div>
              {desc && (
                <p className="text-sm my-2 text-[#878F9B] line-clamp-2">
                  {desc}
                </p>
              )}
            </div>
            <div className="mr-auto flex flex-col items-start gap-3.5">
              <div className="flex items-center gap-1 bg-[linear-gradient(111.32deg,_#FFDAA266_-1.54%,_#FFF3E066_21.68%)] px-5 py-4 rounded-s-md -ml-4">
                <PriceSection />
              </div>
              <ProductStats
                rating={rating}
                salesCount={salesCount}
                isGrid={false}
              />
            </div>
          </div>
          <div className="h-[1px] bg-[#F6F7F8] my-4" />
          <ProductActions demoLink={demo} isGrid={false} />
        </div>
      </section>
    </div>
  );
};

export default memo(ProductCard);
