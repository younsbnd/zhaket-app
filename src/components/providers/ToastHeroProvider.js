"use client";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export default function ToastHeroProvider({ children }) {
  // Fixed ToastProvider usage: children must be inside ToastProvider for context to work
  // Fixes: delete error handling and params error
  // Commit message: Fix ToastProvider children placement for proper toast context; resolves delete and params error
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center">
        {children}
      </ToastProvider>
    </HeroUIProvider>
  );
}
