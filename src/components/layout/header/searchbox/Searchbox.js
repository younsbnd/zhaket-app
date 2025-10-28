"use client";

import React, { useState, useEffect } from "react";
import { Modal, ModalContent, Spinner } from "@heroui/react";
import { IoSearchOutline } from "react-icons/io5";
import { useForm, useWatch } from "react-hook-form";
import ControlledInput from "@/components/shared/forms/ControlledInput";
import { FaFire } from "react-icons/fa";
import Image from "next/image";
import { logger } from "@/lib/utils/logger";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * SearchModal
 * 
 * Displays a centered modal containing a HeroUI-based search form.
 * Includes an inline search icon, polished Tailwind styles, and validations.
 * Real-time product search with debouncing.
 */
export default function SearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Watch the search input value
  const searchQuery = useWatch({
    control,
    name: "searchQuery",
    defaultValue: "",
  });

  // Search products function
  const searchProducts = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data || []);
      }
    } catch (error) {
      logger.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProducts(searchQuery);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle form submission (Enter key)
  const onSubmit = (data) => {
    logger.debug("Search value:", data.searchQuery);
    if (data.searchQuery && data.searchQuery.trim()) {
      onClose();
    }
  };

  // Handle product click
  const handleProductClick = (slug) => {
    reset();
    setSearchResults([]);
    setHasSearched(false);
    onClose();
    router.push(`/category/web/${slug}`);
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [isOpen, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        base: "overflow-hidden bg-white p-0 text-right align-middle shadow-xl md:p-6 rounded-md w-full max-w-[680px]",
      }}
    >
      <ModalContent>
        <div className="flex flex-col gap-2.5 text-right">
          {/* Search Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-5 pt-5 w-full max-w-[640px] mx-auto"
          >
            <div className="relative w-full mt-4">
              {/* Search Icon (inside input) */}
              <IoSearchOutline
                size={22}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#878F9B] pointer-events-none z-10"
              />

              {/* ControlledInput from HeroUI */}
              <ControlledInput
                name="searchQuery"
                control={control}
                placeholder="مثلا قالب وودمارت"
                errors={errors}
                rules={{
                  required: false,
                }}
                variant="bordered"
                color="default"
                classNames={{
                  inputWrapper: "h-[56px] pr-10 rounded-lg border border-[#E5E8EB] shadow-sm hover:border-[#FF9606] focus-within:border-[#FF9606] focus-within:shadow-[0px_8px_20px_-6px_rgba(0,0,0,0.15)] transition-all duration-150",
                  input: "text-sm text-[#76767C] bg-white placeholder:text-[#A1A1A5]",
                }}
              />
            </div>
          </form>

          {/* Search Results Area */}
          <div className="px-5 pb-6 max-h-[400px] overflow-y-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <Spinner size="md" color="warning" />
              </div>
            )}

            {/* No Results State */}
            {!isLoading && hasSearched && searchResults.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-[#878F9B]">
                  محصولی با این عنوان پیدا نشد
                </p>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && searchResults.length > 0 && (
              <>
                <h4 className="flex items-center gap-2 text-sm font-medium text-[#5B5C60] mb-3">
                  <FaFire className="text-[#FF9606]" />
                  نتایج جستجو ({searchResults.length})
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {searchResults.map((product) => {
                    const imageUrl = product.images?.url || "/images/default-product.svg";

                    return (
                      <div
                        key={product._id}
                        onClick={() => handleProductClick(product.slug)}
                        className="flex items-center gap-3 p-2 rounded-lg bg-[#F7F8F9] hover:bg-[#FFF5E6] transition cursor-pointer group"
                      >
                        <Image
                          src={imageUrl}
                          alt={product.title}
                          width={60}
                          height={60}
                          className="object-cover rounded-[10px] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#5B5C60] group-hover:text-[#FF9606] truncate font-medium">
                            {product.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Default Suggestion (when no search) */}
            {!hasSearched && !isLoading && (
              <>
                <h4 className="flex items-center gap-2 text-sm font-medium text-[#5B5C60] mb-3">
                  <FaFire className="text-[#FF9606]" />
                  پیشنهاد ژاکت
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-[#F7F8F9] hover:bg-[#FFF5E6] transition cursor-pointer">
                    <Image
                      src="/images/header/677e2df8cc95f22932086ea2.png"
                      alt="افزونه المنتور پرو"
                      width={60}
                      height={60}
                      className="object-cover rounded-[10px]"
                    />
                    <p className="text-sm text-[#5B5C60] truncate">
                      افزونه المنتور پرو | پلاگین Elementor Pro
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
