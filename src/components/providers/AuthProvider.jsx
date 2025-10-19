"use client";

import { SessionProvider } from "next-auth/react";
import CartSyncer from "./CartSyncer";

//  component to wrap the children in a session provider
export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <CartSyncer />
      {children}
    </SessionProvider>
  );
}
