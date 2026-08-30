"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import type { CourseListItem, Product } from "@/lib/types";
import { PixelBadge } from "./ui";

export function ProductCard({ product }: { product: Product }) {
  const { add, has } = useCart();
  const inCart = has("product", product.id);

  return (
    <article className="flex flex-col border-[3px] border-ink bg-white shadow-pixel">
      <Link href={`/loja/${product.id}`} className="relative block aspect-[4/5] overflow-hidden border-b-[3px] border-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover [image-rendering:pixelated]"
        />
        {product.filterType && (
          <span className="absolute left-2 top-2 border-2 border-ink bg-blush-500 px-1.5 py-0.5 text-[9px] uppercase text-white">
            Provador
          </span>
        )}
        {product.filterColor && (
          <span
            className="absolute bottom-2 right-2 h-6 w-6 border-2 border-ink"
            style={{ backgroundColor: product.filterColor }}
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-1">
          <PixelBadge>{product.category === "makeup" ? "Make" : "Cabelo"}</PixelBadge>
          {product.shade && <span className="text-[9px] text-ink-muted">{product.shade}</span>}
        </div>
        <h3 className="text-[11px] leading-snug text-ink">{product.name}</h3>
        <p className="mt-auto text-xs font-bold text-blush-700">{formatPrice(product.priceCents)}</p>
        <button
          onClick={() =>
            add({
              kind: "product",
              id: product.id,
              name: product.name,
              priceCents: product.priceCents,
              imageUrl: product.imageUrl,
            })
          }
          className="border-[3px] border-ink bg-blush-500 px-2 py-2 text-[10px] uppercase tracking-widest text-white shadow-pixel active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          {inCart ? "No saco +1" : "Adicionar ao saco"}
        </button>
      </div>
    </article>
  );
}

export function CourseCard({ course }: { course: CourseListItem }) {
  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="flex flex-col border-[3px] border-ink bg-white shadow-pixel transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden border-b-[3px] border-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.coverUrl}
          alt={course.title}
          className="h-full w-full object-cover [image-rendering:pixelated]"
        />
        <span className="absolute left-2 top-2 border-2 border-ink bg-ink px-1.5 py-0.5 text-[9px] uppercase text-blush-200">
          {course.level}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="text-[11px] leading-snug text-ink">{course.title}</h3>
        <p className="readable line-clamp-3 text-[10px] text-ink-muted">{course.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-[9px] uppercase text-ink-muted">{course.lessonCount} aulas</span>
          <span className="text-xs font-bold text-blush-700">{formatPrice(course.priceCents)}</span>
        </div>
      </div>
    </Link>
  );
}
