"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineFolderDownload } from "react-icons/hi";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import DashboardProductItem from "./DashboardProductItem";

const PurchasedProducts = () => {
  const { data: orders, isLoading } = useSWR("/api/user/order", fetcher);
  const { createRecord: createDownload } = useCrud(
    "/user/generate-download-link"
  );
  const [downloadingFileId, setDownloadingFileId] = useState(null);

  // handle download file from file id
  const handleDownload = async (fileId) => {
    setDownloadingFileId(fileId);
    try {
      const response = await createDownload({ fileId: fileId });
      if (response.ok && response.data.downloadLink) {
        window.location.href = response.data.downloadLink;
      }

      // if response is not ok, show error toast
      if (!response.ok) {
        addToast({
          description: response?.data?.message,
          color: "danger",
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error) {
      // if error, show error toast
      addToast({
        description: error.error?.message || error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setDownloadingFileId(null);
    }
  };

  // extract products from all orders and get only first 3
  const products =
    orders?.data
      ?.flatMap((order) => order.items.map((item) => item.product))
      .slice(0, 3) || [];

  return (
    <div className="shadow-[0px_25px_10px_0px_#5B5E6812] bg-white rounded-lg p-4">
      {/* title and icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HiOutlineFolderDownload className="w-8 h-8 text-orange-300" />
          <p className="font-bold">محصولات خریداری شده شما</p>
        </div>
        <Link
          href="/panel/downloads"
          className="bg-orange-100/80 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 h-fit px-4 py-2 text-sm"
        >
          مشاهده همه
        </Link>
      </div>
      {/* purchased products list */}
      <div className="min-h-[150px]">
        {/* show loading skeleton while products are loading */}
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="space-y-1">
            {/* map products */}
            {products.map((product, index) => (
              <DashboardProductItem
                key={index}
                product={product}
                handleDownload={handleDownload}
                downloadingFileId={downloadingFileId}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400 text-sm">
              هنوز محصولی خریداری نکرده‌اید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasedProducts;
