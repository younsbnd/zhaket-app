import Image from "next/image";
import React from "react";

const ProductImage = ({ product }) => {
  return (
    <div className="block">
      <div className="flex justify-center items-center  overflow-hidden rounded-[10px] md:h-[360px]! md:w-[360px]!">
        {/* product image */}
        <Image
          src={product?.images?.url}
          alt={product?.images?.alt}
          width={1000}
          height={1000}
          priority
          className="rounded-md w-[459px] h-[459px] object-cover"
        />
      </div>
    </div>
  );
};

export default ProductImage;
