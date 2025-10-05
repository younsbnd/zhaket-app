"use client";
import { useState, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { addToast } from "@heroui/react";
import { fetcher } from "@/lib/api/fetcher";

const useMediaLogic = () => {
  const { mutate } = useSWRConfig();
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [activeImageUrl, setActiveImageUrl] = useState(null);
  const swrKey = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/media?folder=${selectedFolder}`;

  const {
    data: response,
    error,
    isLoading,
  } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false,
  });

  // mutate the swr key when the upload is successful
  const handleUploadSuccess = () => {
    mutate(swrKey);
  };

  // copy image url to clipboard
  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    addToast({
      title: "موفقیت",
      description: "آدرس تصویر کپی شد.",
      color: "success",
    });
  };

  // handle image click for mobile
  const handleImageClick = (imageUrl) => {
    if (activeImageUrl === imageUrl) {
      setActiveImageUrl(null); // Hide buttons if clicking the same image
    } else {
      setActiveImageUrl(imageUrl); // Show buttons for clicked image
    }
  };

  // delete image function
  const handleDelete = async (imageUrl) => {
    if (
      !window.confirm(
        "آیا از حذف این تصویر مطمئن هستید؟ این عمل قابل بازگشت نیست."
      )
    ) {
      return;
    }
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "خطا در حذف تصویر");
      }
      addToast({
        title: "موفقیت",
        description: result.message,
        color: "success",
      });
      mutate(swrKey);
      setActiveImageUrl(null); // Hide buttons after successful delete
    } catch (err) {
      addToast({ title: "خطا", description: err.message, color: "danger" });
    }
  };

  // Close active overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeImageUrl && !event.target.closest('.image-container')) {
        setActiveImageUrl(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeImageUrl]);

  const images = response?.images || [];
  const folders = response?.folders || ["all"];

  return {
    selectedFolder,
    setSelectedFolder,
    activeImageUrl,
    setActiveImageUrl,
    images,
    folders,
    isLoading,
    error,
    handleUploadSuccess,
    copyToClipboard,
    handleImageClick,
    handleDelete
  };
};

export default useMediaLogic;