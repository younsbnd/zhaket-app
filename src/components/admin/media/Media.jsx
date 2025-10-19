"use client";

import { Button } from "@heroui/react";
import React from "react";
import { BiCopy } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import Image from "next/image";
import UploadFile from "@/components/admin/media/UploadFile";
import useMediaLogic from "@/components/admin/media/MediaLogic";
import { FiImage, FiUpload, FiFolder } from "react-icons/fi";

const Media = () => {
  const {
    selectedFolder,
    setSelectedFolder,
    activeImageUrl,
    images,
    folders,
    isLoading,
    error,
    handleUploadSuccess,
    copyToClipboard,
    handleImageClick,
    handleDelete,
  } = useMediaLogic();

  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-10" />

      {/* Main container */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="glass rounded-2xl p-5">
          {/* Header */}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FiImage className="text-emerald-400" />
            مدیریت رسانه
          </h2>

          {/* Upload section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FiUpload className="text-blue-400" />
              <h3 className="text-lg font-semibold">آپلود فایل جدید</h3>
            </div>
            <UploadFile onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Gallery section */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 mb-6">
              <FiFolder className="text-purple-400" />
              <h3 className="text-lg font-semibold">گالری تصاویر</h3>
            </div>

            {/* Gallery folders */}
            <div className="flex flex-wrap gap-2 mb-6">
              {folders.map((folder) => (
                <Button
                  size="sm"
                  radius="sm"
                  key={folder}
                  onClick={() => setSelectedFolder(folder)}
                  variant="flat"
                  className={`text-sm px-4 py-2 transition-all duration-300 ${
                    selectedFolder === folder
                      ? "bg-gradient-to-l from-blue-600 to-indigo-700 text-white"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {folder === "all" ? "همه" : folder}
                </Button>
              ))}
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-400/40 rounded-lg text-red-400 mb-4">
                <span>خطا در دریافت گالری: {error.message}</span>
              </div>
            )}

            {/* Images */}
            {!isLoading && !error && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {images.length === 0 ? (
                  <div className="col-span-full text-center py-16 text-slate-400">
                    <FiImage className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">هیچ تصویری موجود نیست</p>
                    <p className="text-sm mt-2">
                      برای شروع، تصویر جدیدی آپلود کنید
                    </p>
                  </div>
                ) : (
                  images.map((image) => {
                    const isActive = activeImageUrl === image.url;
                    return (
                      <div
                        key={image.url}
                        className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 image-container"
                      >
                        {/* image */}
                        <div
                          className="aspect-square relative cursor-pointer"
                          onClick={() => handleImageClick(image.url)}
                        >
                          <Image
                            src={image.url}
                            alt={image.name}
                            className="object-cover"
                            fill
                            priority
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          />
                        </div>
                        {/* overlay with buttons */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 transition-all duration-300 flex items-center justify-center gap-3 
                          ${isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}`}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(image.url);
                            }}
                            className={`p-2.5 bg-white/90 rounded-full text-gray-700 transition-transform duration-300 hover:bg-white cursor-pointer
                              ${isActive ? "scale-100" : "scale-0 md:group-hover:scale-100"}`}
                            title="کپی کردن آدرس"
                          >
                            <BiCopy className="text-lg" />
                          </button>
                          {/* delete button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(image.url);
                            }}
                            className={`p-2.5 bg-red-500 text-white rounded-full transition-transform duration-300 hover:bg-red-600 cursor-pointer
                              ${isActive ? "scale-100" : "scale-0 md:group-hover:scale-100"}`}
                            title="حذف تصویر"
                          >
                            <GoTrash className="text-lg" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;