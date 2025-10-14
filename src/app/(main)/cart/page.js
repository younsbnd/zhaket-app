import ShoppingCart from "@/components/main/cart/ShoppingCart";
import { metadata } from "@/lib/seo/metadata";
import React from "react";

// seo metadata for cart page
export const generateMetadata = () => {
  return metadata({
    title: "سبد خرید",
    description: "سبد خرید",
    noindex: true,
  });
};

const CartPage = () => {
  return (
    <div>
      <ShoppingCart />
    </div>
  );
};

export default CartPage;
