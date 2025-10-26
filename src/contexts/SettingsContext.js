"use client";

import { createContext, useContext } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";

// create a context for the settings
const SettingsContext = createContext({});

// use the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children, initialSettings }) => {
  // Fetch settings from API with SWR
  const {
    data: response,
    isLoading,
    error,
  } = useSWR(process.env.NEXT_PUBLIC_API_BASE_URL + "/main/settings", fetcher, {
    fallbackData: initialSettings ? { data: initialSettings } : undefined,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // default settings
  const settings = response?.data ||
    initialSettings || {
      siteName: "فروشگاه قالب و افزونه ژاکت",
      siteDescription: "جدیدترین قالب‌ها و افزونه‌های وب را از ما بخواهید.",
      logoUrl: "/images/logo.svg",
      faviconUrl: "/favicon.ico",
      socialLinks: {
        instagram: "https://www.instagram.com/zhaketcom/",
        linkedin: "https://www.linkedin.com/company/zhaket/",
      },
      contactInfo: {
        address: "تهران, ایران",
        phone: "09123456789",
        email: "info@zhaket.com",
      },
      copyrightText: "تمامی حقوق برای ژاکت محفوظ است",
    };

  return (
    <SettingsContext.Provider value={{ settings, isLoading, error }}>
      {children}
    </SettingsContext.Provider>
  );
};
