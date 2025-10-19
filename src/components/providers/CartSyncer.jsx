"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCartStore } from "@/stores/useCartStore";

export default function CartSyncer() {
  const { data: session, status } = useSession();
  const { initializeCart } = useCartStore();

  useEffect(() => {
    // If the user is logged in (authenticated) and the cart is not synced...
    if (status !== "loading") {
      initializeCart(session);
    }
  }, [status, session, initializeCart]);

  return null;
}
