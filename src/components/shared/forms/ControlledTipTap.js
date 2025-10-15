"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductActions from "./ui/ProductActions";
import ProductStats from "./ProductStats";

const formatNumber = (num) => new Intl.NumberFormat("fa-IR").format(num || 0);

const stripHtml = (html) => {
  if (!html) return "";
  const withoutTags = html.replace(/<[^>]*>/g, "");

  if (typeof window !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = withoutTags;
    return textarea.value.trim();
  }

  // SSR fallback
  const entities = { '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
  return withoutTags.replace(/&[#\w]+;/g, (e) => entities[e] || ' ').trim();
};

const ProductCardList = ({ product }) => {
  const { slug, title, price = 0, rating = {}, salesCount = 0, images = {}, author = {}, description = "", demoUrl } = product;
  const productLink = `/web/${slug}`;
  const imageSrc = images?.url || product.image || "/images/default-product.svg";

  return (
    <div className="rounded-xl border border-[#F4F4F4] shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] overflow-hidden">
      <section className="flex gap-4 p-4">
        <Link href={productLink} className="flex-shrink-0">
          <Image src={imageSrc} alt={title} width={250} height={250} priority className="w-[250px] rounded-lg object-cover shadow-[0px_5px_10px_0px_#0000000D]" />
        </Link>

        <div className="flex-1 flex flex-col justify-around">
          <div className="flex items-center gap-8">
            <div>
              <Link href={productLink} className="hover:text-[#ff9606] transition-colors">
                <h3 className="text-lg font-bold line-clamp-1">{title}</h3>
              </Link>

              <div className="flex items-center gap-3 mt-4 pb-2">
                {author?.name && <Image src={author.avatar || "/images/default-avatar.svg"} alt={author.name} width={30} height={30} className="rounded-full border-2 border-white" priority />}
                <span className="text-sm text-[#878F9B] truncate">توسعه دهنده: {author.name}</span>
              </div>

              {description && <p className="text-sm my-2 text-[#878F9B] line-clamp-2">{stripHtml(description)}</p>}
            </div>

            <div className="mr-auto flex flex-col items-start gap-3.5">
              <div className="flex items-center gap-1 bg-[linear-gradient(111.32deg,_#FFDAA266_-1.54%,_#FFF3E066_21.68%)] px-5 py-4 rounded-s-md -ml-4">
                <span className="font-bold text-xl text-[#424244]">{formatNumber(price)}</span>
                <span className="text-[13px] text-[#76767C]">تومان</span>
              </div>
              <ProductStats rating={rating} salesCount={salesCount} isGrid={false} />
            </div>
          </div>

          <div className="h-[1px] bg-[#F6F7F8] my-4" />
          <ProductActions demoLink={demoUrl || `#`} isGrid={false} />
        </div>
      </section>
    </div>
  );
};

export default memo(ProductCardList);
