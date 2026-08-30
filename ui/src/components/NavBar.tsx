"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const links = [
  ["/loja", "Loja"],
  ["/cursos", "Cursos"],
  ["/provador", "Provador"],
];

export function NavBar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-blush-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center border-[3px] border-ink bg-blush-500 text-[10px] text-white">
            C
          </span>
          <span className="font-display text-xs text-ink sm:text-sm">
            CLÉ<span className="text-blush-600">BEAUTY</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`border-2 px-3 py-1.5 text-[11px] uppercase tracking-widest ${
                isActive(href)
                  ? "border-ink bg-blush-500 text-white"
                  : "border-transparent text-ink hover:border-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/carrinho"
            className="relative border-[3px] border-ink bg-white px-2.5 py-1.5 text-[11px] uppercase"
          >
            Saco
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center border-2 border-ink bg-blush-500 px-1 text-[9px] text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/conta"
            className={`border-[3px] border-ink px-2.5 py-1.5 text-[11px] uppercase ${
              isActive("/conta") ? "bg-ink text-white" : "bg-white text-ink"
            }`}
          >
            {user ? user.name.split(" ")[0] : "Conta"}
          </Link>
          <button
            className="border-[3px] border-ink bg-white px-2 py-1.5 text-[11px] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            ≡
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t-[3px] border-ink md:hidden">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`border-b-2 border-ink/20 px-4 py-3 text-[11px] uppercase tracking-widest ${
                isActive(href) ? "bg-blush-500 text-white" : "bg-blush-50 text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
