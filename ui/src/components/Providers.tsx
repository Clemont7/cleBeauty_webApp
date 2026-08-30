"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { AuthModalProvider } from "@/context/AuthModalContext";
import { AuthModal } from "./AuthModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <AuthModalProvider>
          {children}
          <AuthModal />
        </AuthModalProvider>
      </CartProvider>
    </AuthProvider>
  );
}
