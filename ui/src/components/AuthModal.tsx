"use client";

import { useEffect } from "react";
import { useAuthModal } from "@/context/AuthModalContext";
import { AuthForm } from "./AuthForm";

export function AuthModal() {
  const { isOpen, reason, close } = useAuthModal();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4"
      onClick={close}
    >
      <div
        className="w-full max-w-sm border-[3px] border-ink bg-blush-50 p-5 shadow-pixel-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-sm text-ink">Cria a tua conta Clé</h3>
          <button
            onClick={close}
            aria-label="Fechar"
            className="border-2 border-ink bg-white px-2 text-xs leading-none"
          >
            X
          </button>
        </div>
        {reason && (
          <p className="mb-3 border-2 border-ink bg-white px-2 py-1 text-[10px] leading-relaxed">
            {reason}
          </p>
        )}
        <AuthForm onSuccess={close} />
      </div>
    </div>
  );
}
