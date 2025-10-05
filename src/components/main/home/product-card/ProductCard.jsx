"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { logger } from "@/lib/utils/logger";
import Link from "next/link";
import { motion } from "framer-motion";
import { TbShoppingCart, TbShoppingCartDiscount } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { PiStarThin } from "react-icons/pi";

const ANIMATION_CONFIG = {
  card: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, whileHover: { y: -5 } },
  image: { whileHover: { scale: 1.05 }, transition: { duration: 0.3 } },
  content: { initial: { y: 0 }, whileHover: { y: -10 }, transition: { duration: 0.3 } },
  button: { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } },
};

const formatNumber = (num) => new Intl.NumberFormat("fa-IR").format(num || 0);
const formatRating = (rating) => (!rating || isNaN(rating)) ? "0.0" : Number(rating).toFixed(1);

/**
 * Strip HTML tags from text
 * @param {string} html - HTML string
 * @returns {string} Plain text without HTML tags
 */
const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

/**
 * Eye icon for preview button (exact SVG from design)
 */
const EyeIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor"></path>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="currentColor"></path>
  </svg>
);

/**
 * Shopping cart icon (exact SVG from design)
 */
const CartIcon = () => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="16" 
    width="16" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    <path d="M17 17h-11v-14h-2"></path>
    <path d="M6 5l14 1l-1 7h-13"></path>
  </svg>
);

/**
 * Product card component
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @param {string} props.viewMode - View mode: 'grid' or 'list' (default: 'grid')
 * @returns {JSX.Element} Product card
 */
const ProductCard = ({ product = {}, viewMode = "grid" }) => {
  const {
    _id = "",
    title = "",
    slug = "",
    price = 0,
    discount = 0,
    rating = { average: 0, count: 0 },
    salesCount = 0,
    images = { url: "", alt: "" },
    author = { name: "", avatar: "", slug: "" },
    category = { name: "", slug: "" },
    tags = [],
    demoUrl = "",
    description = ""
  } = product;

  const formattedPrice = useMemo(() => formatNumber(price), [price]);
  const formattedRating = useMemo(() => formatRating(rating?.average || 0), [rating]);
  const formattedSales = useMemo(() => formatNumber(salesCount), [salesCount]);
  const cleanDescription = useMemo(() => stripHtmlTags(description), [description]);
  const productLink = `/web/${slug}`;
  // Use default image if product has no image
  const imageSrc = images?.url || product.image || "/images/default-product.svg";
  const demoLink = demoUrl || `${productLink}/demo`;
  const authorName = author?.name || " ";
  const authorAvatar = author?.avatar || "/images/default-avatar.svg";

  // Debug: Log product in development
  if (process.env.NODE_ENV === 'development' && !images?.url && !product.image) {
    // Log missing product image through the unified logger for easier filtering
    logger.warn('[ProductCard] Product without image', { title, slug, hasImage: !!imageSrc });
  }

  // Optional: Don't render if no slug or title (invalid product)
  if (!slug || !title) {
    if (process.env.NODE_ENV === 'development') {
      logger.warn('[ProductCard] Invalid product (no slug/title):', { slug, title, product });
    }
    return null;
  }

  // Grid view layout
  if (viewMode === "grid") {
    return (
      <motion.div
        className="flex flex-col justify-between overflow-hidden group relative aspect-[0.74] h-auto w-full max-w-[400px] rounded-md shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] md:max-h-[410px] md:max-w-[304px] mx-auto border-[1px] border-solid border-[#E5E8EB] md:mx-0"
        data-cy="data-cy-product-card"
        {...ANIMATION_CONFIG.card}
      >
        <Link href={productLink} data-cy="data-cy-product-name">
          <motion.div className="relative overflow-hidden" {...ANIMATION_CONFIG.image}>
            <Image
              alt={title || "Product"}
              loading="lazy"
              width={272}
              height={272}
              decoding="async"
              data-nimg="1"
              className="object-cover w-full transition-transform duration-300 group-hover:scale-105"
              src={imageSrc}
              priority={false}
              quality={85}
              unoptimized
            />
          </motion.div>
        </Link>

        <motion.section
          className="product-content product-card-content absolute bottom-0 w-full bg-white p-[20px] transition-all duration-300 md:bottom-[-62px] group-hover:bottom-0"
          data-cy="data-cy-product-content-card"
          {...ANIMATION_CONFIG.content}
        >
          <p className="transition duration-300 text-base leading-7 font-bold truncate-2 min-h-[60px] pb-2 text-[#424244] group-hover:text-[#ff9606]">
            <Link href={productLink} className="group-hover:text-[#ff9606]">
              {title}
            </Link>
          </p>

          <div className="flex w-full items-end justify-between pb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-start gap-1">
                <span
                  className="transition duration-300 text-xl leading-7 font-bold text-[#424244]"
                  data-cy="data-cy-product-price"
                >
                  {formattedPrice}
                </span>
                <span className="transition duration-300 text-[13px] text-[#76767C]">تومان</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5">
              <div className="flex items-center justify-center gap-1">
                <p className="transition duration-300 text-sm leading-7 pt-1 text-[#878F9B]">
                  {formattedRating}
                </p>
                <FaStar className="h-4 w-4 text-[#FFC87B]" />
              </div>

              <div className="flex items-center justify-center gap-1">
                <span className="transition duration-300 text-sm leading-7 pt-1 text-[#878F9B]">
                  {formattedSales}
                </span>
                <TbShoppingCartDiscount className="h-4 w-4 text-[#878F9B]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full gap-2 p-0">
            <Link
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[42px] flex-1"
              data-cy="data-cy-preview-button"
            >
              <motion.button
                className="cursor-pointer flex items-center justify-center gap-[10px] rounded-lg focus:outline-hidden focus:outline-0 bg-[#EAEEF380] h-full w-full p-0 text-[13px] font-bold text-[#7E899B] transition duration-300 hover:bg-[#878F9B] hover:text-white"
                type="button"
                {...ANIMATION_CONFIG.button}
              >
                <div className="flex items-center justify-center">پیشنمایش</div>
              </motion.button>
            </Link>

            <motion.button
              data-cy="data-cy-add-to-card-button"
              className="font-semibold cursor-pointer flex items-center justify-center rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 gap-2.5 hover:bg-[#EB8800] h-[42px] flex-1 bg-[#FFAE11] p-0 text-[13px] text-white"
              type="button"
              {...ANIMATION_CONFIG.button}
            >
              <div className="flex items-center justify-center">افزودن به سبد خرید</div>
            </motion.button>
          </div>
        </motion.section>
      </motion.div>
    );
  }

  // List view layout
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#F4F4F4] shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] border-none">
      <section className="flex gap-4 p-4">
        {/* Image */}
        <Link href={productLink} className="flex-shrink-0">
          <Image
            alt={title || "محصول"}
            loading="lazy"
            width={250}
            height={250}
            decoding="async"
            data-nimg="1"
            className="rounded-lg shadow-[0px_5px_10px_0px_#0000000D] h-full w-[250px] object-cover"
            src={imageSrc}
            priority={false}
            quality={85}
            unoptimized
          />
        </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-around">
        <div className="flex items-center justify-center gap-8">
          {/* Title and description */}
          <div>
            <Link className="transition-all duration-300 hover:text-[#ff9606]" href={productLink}>
              <h3 className="text-lg font-bold text-i-typography line-clamp-1">{title}</h3>
            </Link>
            
            {/* Author/Developer Information */}
            {authorName && (
              <div className="items-center flex w-full justify-start gap-3 pb-2" data-cy="data-cy-icon-text-combo">
                <Image
                  alt={authorName}
                  loading="lazy"
                  width={30}
                  height={30}
                  decoding="async"
                  data-nimg="1"
                  className="rounded-full border-2 border-[#FFFFFF]"
                  src={authorAvatar}
                  unoptimized
                />
                <span className="transition duration-300 text-sm leading-7 text-[#878F9B] truncate">
                  توسعه دهنده: {authorName}
                </span>
              </div>
            )}

            {cleanDescription && (
              <p className="transition duration-300 text-sm leading-7 my-2 line-clamp-2 text-[#878F9B]">
                {cleanDescription}
              </p>
            )}
          </div>

          {/* Price and sales */}
          <div className="flex justify-center mr-auto flex-col items-start gap-3.5">
            <div className="-ml-4 flex items-center gap-3 rounded-s-md bg-[linear-gradient(111.32deg,_#FFDAA266_-1.54%,_#FFF3E066_21.68%)] px-5 py-4">
              <div className="flex flex-col items-end">
                <div className="flex items-center justify-start gap-1">
                  <span className="transition duration-300 text-xl leading-7 font-bold text-[#424244]" data-cy="data-cy-product-price">
                    {formattedPrice}
                  </span>
                  <span className="transition duration-300 text-[13px] text-[#76767C]">تومان</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1">
             <TbShoppingCart  className="text-2xl text-[#FF9606]" />
              <span className="transition duration-300 text-lg leading-7 font-bold text-[#424244]">
                {formattedSales}
              </span>
              <p className="transition duration-300 text-xs leading-7 text-[#76767C]">فروش</p>
            </div>

            <div className="flex items-center justify-center gap-1">
        <PiStarThin  className="text-2xl text-[#FF9606]" />
              <span className="transition duration-300 text-lg leading-7 font-bold text-[#424244]">
                {formattedRating}
              </span>
              <p className="transition duration-300 text-xs leading-7 text-[#76767C]">رای: {rating?.count || 0}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full mt-8 mb-4 bg-[#F6F7F8]"></div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="w-full max-w-[135px]">
            <div className="flex items-center w-full justify-end">
              <div className="relative h-10"></div>
            </div>
          </div>

          <div className="flex items-center justify-center mr-auto gap-3 p-0">
            <Link
              data-cy="data-cy-preview-button"
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-[51px] w-[168px]"
            >
              <button
                className="cursor-pointer flex items-center justify-center gap-[10px] rounded-lg focus:outline-hidden focus:outline-0 bg-[#EAEEF380] h-full w-full p-0 text-[13px] font-bold text-[#7E899B] transition duration-300 hover:bg-[#878F9B] hover:text-white"
                type="button"
              >
                <EyeIcon />
                <div className="flex items-center justify-center">پیشنمایش </div>
              </button>
            </Link>

            <button
              data-cy="data-cy-add-to-card-button"
              className="font-semibold cursor-pointer flex items-center justify-center rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 gap-2.5 hover:bg-[#EB8800] flex-1 bg-[#FFAE11] p-0 text-[13px] text-white h-[51px] w-[168px]"
              type="button"
            >
              <CartIcon />
              <div className="flex items-center justify-center">افزودن به سبد خرید</div>
            </button>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default React.memo(ProductCard);
