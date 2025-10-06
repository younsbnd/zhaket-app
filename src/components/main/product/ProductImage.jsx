import Image from "next/image";
import React, { useState } from "react";

const ProductImage = ({ product }) => {
  const [imgError, setImgError] = useState(false);

  // default image in case of no image
  const defaultImage = "/images/no-image.png";
  const imageSrc =
    imgError || !product?.images?.url ? defaultImage : product.images.url;

  const imageAlt = product?.images?.alt || product?.title || "تصویر محصول";

  return (
    <div className="block">
      <div className="flex justify-center items-center overflow-hidden rounded-[10px] w-[342px] h-[342px] mx-auto md:h-[360px] md:w-[360px] bg-gray-100">
        {/* product image */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={400}
          priority
          className="rounded-md w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    </div>
  );
};

export default ProductImage;
