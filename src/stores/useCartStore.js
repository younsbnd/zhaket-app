import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addToast } from "@heroui/react";

// a helper function to send standard requests to the api
const callApi = async (endpoint, options) => {
  const response = await fetch(`/api/${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطایی در ارتباط با سرور رخ داد.");
  }
  return response.json();
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isInitialized: false,
      // initialize the cart
      initializeCart: async (session) => {
        if (get().isInitialized) return;

        if (session) {
          try {
            const serverCart = await callApi("cart", { method: "GET" });
            set({ items: serverCart.items || [], isInitialized: true });
          } catch (error) {
            console.error("خطا در همگام‌سازی سبد خرید:", error.message);
            set({ isInitialized: true });
          }
        } else {
          set({ isInitialized: true });
        }
      },

      // action to add product
      addToCart: async (product, session) => {
        const itemExists = get().items.some((item) => item._id === product._id);
        if (itemExists) {
          addToast({
            title: "توجه",
            description: "این محصول قبلاً به سبد خرید اضافه شده است.",
            color: "warning",
          });
          return;
        }

        const previousItems = get().items;
        set({ items: [...previousItems, product] });
        addToast({
          title: "موفقیت",
          description: `${product.title} به سبد خرید اضافه شد.`,
          color: "success",
        });

        if (session) {
          try {
            await callApi("cart", {
              method: "POST",
              body: JSON.stringify({ productId: product._id }),
            });
          } catch (error) {
            addToast({
              title: "خطا",
              description: error.message,
              color: "danger",
            });
            set({ items: previousItems });
          }
        }
      },

      // action to remove product
      removeFromCart: async (productId, session) => {
        const previousItems = get().items;
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
        addToast({
          title: "موفقیت",
          description: "محصول از سبد خرید حذف شد.",
          color: "info",
        });

        if (session) {
          try {
            await callApi("cart", {
              method: "DELETE",
              body: JSON.stringify({ productId }),
            });
          } catch (error) {
            addToast({
              title: "خطا",
              description: error.message,
              color: "danger",
            });
            set({ items: previousItems });
          }
        }
      },

      // clear the cart
      clearCart: () => {
        set({ items: [], isInitialized: false });
      },

      // refresh cart from server (to get updated prices)
      refreshCart: async (session) => {
        if (!session) return;

        try {
          const serverCart = await callApi("cart", { method: "GET" });
          set({ items: serverCart.items || [] });
        } catch (error) {
          console.error("خطا در به‌روزرسانی سبد خرید:", error.message);
        }
      },
    }),
    { name: "cart-storage" }
  )
);
