"use client";

import { useState } from "react";
import { ProductCard } from "@/components/cards";
import { EmptyBox, ErrorBox, Loading } from "@/components/states";
import { SectionTitle } from "@/components/ui";
import { useApi } from "@/lib/useApi";
import type { Product } from "@/lib/types";

const tabs = [
  ["all", "Tudo"],
  ["makeup", "Maquilhagem"],
  ["hair", "Cabelo"],
  ["filter", "Com provador"],
] as const;

export default function LojaPage() {
  const [tab, setTab] = useState<(typeof tabs)[number][0]>("all");
  const { data, error, loading } = useApi<Product[]>("/products");

  const items = (data || []).filter((p) => {
    if (tab === "all") return true;
    if (tab === "filter") return !!p.filterType;
    return p.category === tab;
  });

  return (
    <div className="space-y-6">
      <SectionTitle kicker="Loja" title="Maquilhagem & cabelo" />

      <div className="flex flex-wrap gap-2">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`border-[3px] border-ink px-3 py-1.5 text-[10px] uppercase tracking-widest ${
              tab === id ? "bg-blush-500 text-white shadow-pixel" : "bg-white text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && <Loading />}
      {error && <ErrorBox message={error} />}
      {!loading && !error && items.length === 0 && <EmptyBox>Sem produtos nesta categoria.</EmptyBox>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
