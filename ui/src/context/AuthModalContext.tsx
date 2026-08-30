"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface AuthModalContextValue {
  isOpen: boolean;
  reason: string | null;
  open: (reason?: string) => void;
  close: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<string | null>(null);

  const open = useCallback((r?: string) => {
    setReason(r ?? null);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, reason, open, close }), [isOpen, reason, open, close]);
  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal deve ser usado dentro de <AuthModalProvider>");
  return ctx;
}
