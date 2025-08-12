"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchResultItem({
  item,
  onSelect,
  index,
  searchQuery = "",
}) {
  const router = useRouter();

  const handleClick = () => {
    const recentSearch = {
      title: searchQuery.trim() || item.name,
      imageUrl: item.imageUrl,
    };

    onSelect(recentSearch);
    router.push(`/products/${item.productCode}`);
  };

  return (
    <motion.button
      key={index}
      onClick={handleClick}
      className='flex items-center gap-4 w-full text-right transition p-3 border-b cursor-pointer border-black/20 hover:bg-muted/30 active:scale-[0.98] rounded-md'
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`انتخاب ${item.name}`}>
      {/* Image */}
      <div className='w-16 h-16 rounded overflow-hidden flex-shrink-0'>
        <Image
          width={200}
          height={200}
          src={item.imageUrl?.[0] || "/images/placeholder.png"}
          alt={item.name || "Product Image"}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Text Info */}
      <div className='flex flex-col text-right flex-grow min-w-0 border-r-2 border-red pr-3'>
        <span className='font-semibold text-sm text-black truncate'>
          {item.name}
        </span>
        <span className='text-xs text-gray-500 truncate'>
          برند: {item.brand} | دسته: {item.category}
        </span>
        <span className='text-sm font-bold text-red mt-1'>
          {item.price.toLocaleString()} تومان
        </span>
      </div>
    </motion.button>
  );
}
