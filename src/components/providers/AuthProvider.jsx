"use client";

import { SessionProvider } from "next-auth/react";

//  component to wrap the children in a session provider
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
