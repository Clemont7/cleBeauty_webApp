"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { EmptyBox } from "@/components/states";
import { PixelButton, SectionTitle } from "@/components/ui";
import { formatPrice } from "@/lib/format";

export default function CarrinhoPage() {
  const { items, totalCents, setQuantity, remove } = useCart();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <SectionTitle kicker="Saco" title="O teu saco de compras" />

      {items.length === 0 ? (
        <EmptyBox>
          O saco está vazio.{" "}
          <Link href="/loja" className="text-blush-600 underline">
            Ir à loja
          </Link>
        </EmptyBox>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={`${item.kind}:${item.id}`}
                className="flex gap-3 border-[3px] border-ink bg-white p-3 shadow-pixel"
              >
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-16 w-16 border-2 border-ink object-cover [image-rendering:pixelated]"
                  />
                )}
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-[11px] text-ink">{item.name}</p>
                  <p className="text-[10px] uppercase text-ink-muted">
                    {item.kind === "course" ? "Curso" : "Produto"}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    {item.kind === "product" ? (
                      <div className="flex items-center gap-1">
                        <button
                          className="border-2 border-ink bg-white px-2 text-xs"
                          onClick={() => setQuantity(item.kind, item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-[11px]">{item.quantity}</span>
                        <button
                          className="border-2 border-ink bg-white px-2 text-xs"
                          onClick={() => setQuantity(item.kind, item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <span />
                    )}
                    <span className="text-[11px] font-bold text-blush-700">
                      {formatPrice(item.priceCents * item.quantity)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => remove(item.kind, item.id)}
                  className="self-start border-2 border-ink bg-white px-2 text-xs"
                  aria-label="Remover"
                >
                  X
                </button>
              </li>
            ))}
          </ul>

          <aside className="h-fit border-[3px] border-ink bg-blush-50 p-4 shadow-pixel">
            <p className="text-[10px] uppercase tracking-widest text-ink-muted">Total</p>
            <p className="text-2xl font-bold text-blush-700">{formatPrice(totalCents)}</p>
            <PixelButton className="mt-4 w-full" onClick={() => router.push("/checkout")}>
              Finalizar compra
            </PixelButton>
            <p className="readable mt-2 text-[9px] text-ink-muted">
              Checkout de demonstração — não é feita nenhuma cobrança real.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
