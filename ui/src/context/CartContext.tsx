"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  kind: "product" | "course";
  id: string;
  name: string;
  priceCents: number;
  imageUrl?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  totalCents: number;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (kind: CartItem["kind"], id: string, quantity: number) => void;
  remove: (kind: CartItem["kind"], id: string) => void;
  has: (kind: CartItem["kind"], id: string) => boolean;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cle.cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const key = (i: { kind: string; id: string }) => `${i.kind}:${i.id}`;
    return {
      items,
      count: items.reduce((n, i) => n + (i.kind === "course" ? 1 : i.quantity), 0),
      totalCents: items.reduce((n, i) => n + i.priceCents * i.quantity, 0),
      add: (item, quantity = 1) =>
        setItems((prev) => {
          const existing = prev.find((i) => key(i) === key(item));
          // courses are single-purchase
          if (existing) {
            if (item.kind === "course") return prev;
            return prev.map((i) =>
              key(i) === key(item) ? { ...i, quantity: i.quantity + quantity } : i,
            );
          }
          return [...prev, { ...item, quantity: item.kind === "course" ? 1 : quantity }];
        }),
      setQuantity: (kind, id, quantity) =>
        setItems((prev) =>
          prev
            .map((i) =>
              key(i) === `${kind}:${id}` ? { ...i, quantity: Math.max(1, quantity) } : i,
            )
            .filter(Boolean),
        ),
      remove: (kind, id) =>
        setItems((prev) => prev.filter((i) => key(i) !== `${kind}:${id}`)),
      has: (kind, id) => items.some((i) => key(i) === `${kind}:${id}`),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
