"use client";
import React, { useState } from "react";
import DownloadItem from "./DownloadItem";
import DownloadsSkeleton from "@/components/skeletons/user-panel/DownloadsSkeleton";
import NoDownloads from "./NoDownloads";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";

const UserDownloads = () => {
  const { data: orders, isLoading } = useSWR("/api/user/order", fetcher);
  const { createRecord: createDownload } = useCrud("/user/generate-download-link");
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

  // extract products from all orders
  const products =
    orders?.data?.flatMap((order) => order.items.map((item) => item.product)) ||
    [];

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return <DownloadsSkeleton />;
  }

  // Show no downloads message if no products are available
  if (!products || products.length === 0) {
    return <NoDownloads />;
  }

  return (
    <div className="text-right bg-transparent p-1 md:py-0 min-h-[calc(100vh-200px)] mt-5">
      <div className="rounded-lg bg-white shadow-[0px_25px_10px_0px_#5B5E6812]">
        <div className="p-6.5 pt-6 space-y-3.5 !bg-[#FBFCFD]">
          {products.map((product, index) => (
            <DownloadItem
              key={index}
              product={product}
              handleDownload={handleDownload}
              downloadingFileId={downloadingFileId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDownloads;
