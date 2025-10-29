"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { RiFolderDownloadLine } from "react-icons/ri";

const DashboardProductItem = ({ product, handleDownload, downloadingFileId }) => {
  const noImage = "/images/no-image.png";
  const fileId = product?.files?.[0];
  const isLoading = downloadingFileId === fileId;

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-all duration-200 rounded-lg border-b border-gray-100 last:border-b-0">
      {/* product image */}
      <div className="min-w-[50px] min-h-[50px] rounded-lg relative">
        <Image
          src={product?.images?.url || noImage}
          alt={product?.images?.alt || product?.title}
          width={50}
          height={50}
          className="h-[50px] w-[50px] object-contain rounded-lg"
        />
      </div>
      {/* product title */}
      <div className="flex-1">
        <Link
          href={`#`}
          className="text-gray-800 hover:text-orange-400 transition-all text-sm line-clamp-2 leading-6"
        >
          {product?.title}
        </Link>
      </div>
      {/* download button */}
      <div>
        <Button
          size="sm"
          className="flex items-center gap-1 text-xs font-medium border-[1.5px] bg-background border-orange-300 text-orange-400 hover:bg-orange-400 hover:text-white transition-all"
          onPress={() => product?.files?.length > 0 && handleDownload(fileId)}
          isDisabled={isLoading || product?.files?.length === 0}
          isLoading={isLoading}
        >
          <RiFolderDownloadLine className="w-4 h-4" />
          دانلود
        </Button>
      </div>
    </div>
  );
};

export default DashboardProductItem;

