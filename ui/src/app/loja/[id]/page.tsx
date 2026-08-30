"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ErrorBox, Loading } from "@/components/states";
import { PixelButton, PixelLink, PixelBadge } from "@/components/ui";
import { formatPrice } from "@/lib/format";
import { useApi } from "@/lib/useApi";
import type { Product } from "@/lib/types";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { add } = useCart();
  const { data: product, error, loading } = useApi<Product>(`/products/${id}`);

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;
  if (!product) return null;

  return (
    <div className="space-y-6">
      <Link href="/loja" className="text-[10px] uppercase tracking-widest text-blush-600 underline">
        ← Voltar à loja
      </Link>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative border-[3px] border-ink shadow-pixel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-square w-full object-cover [image-rendering:pixelated]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <PixelBadge>{product.category === "makeup" ? "Maquilhagem" : "Cabelo"}</PixelBadge>
            {product.shade && <PixelBadge>{product.shade}</PixelBadge>}
          </div>
          <h1 className="text-lg leading-snug text-ink sm:text-2xl">{product.name}</h1>
          <p className="text-base font-bold text-blush-700">{formatPrice(product.priceCents)}</p>
          <p className="readable text-ink-muted">{product.description}</p>

          {product.filterColor && (
            <div className="flex items-center gap-3 border-[3px] border-ink bg-blush-50 p-3">
              <span
                className="h-8 w-8 border-2 border-ink"
                style={{ backgroundColor: product.filterColor }}
              />
              <span className="text-[10px] uppercase tracking-widest">Tom do provador virtual</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <PixelButton
              onClick={() =>
                add({
                  kind: "product",
                  id: product.id,
                  name: product.name,
                  priceCents: product.priceCents,
                  imageUrl: product.imageUrl,
                })
              }
            >
              Adicionar ao saco
            </PixelButton>
            <PixelButton
              variant="ghost"
              onClick={() => {
                add({
                  kind: "product",
                  id: product.id,
                  name: product.name,
                  priceCents: product.priceCents,
                  imageUrl: product.imageUrl,
                });
                router.push("/carrinho");
              }}
            >
              Comprar já
            </PixelButton>
            {product.filterType && (
              <PixelLink href={`/provador?product=${product.id}`} variant="ink">
                Experimentar no provador
              </PixelLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
