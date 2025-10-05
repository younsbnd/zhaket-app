import Image from "next/image";
import React from "react";

const ProductImage = ({ product }) => {
  return (
    <div className="block">
      <div className="flex justify-center items-center overflow-hidden rounded-[10px] w-[342px] h-[342px] mx-auto md:h-[360px] md:w-[360px]">
        {/* product image */}
        <Image
          src={product?.images?.url}
          alt={product?.images?.alt}
          width={400}
          height={400}
          priority
          className="rounded-md w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProductImage;
