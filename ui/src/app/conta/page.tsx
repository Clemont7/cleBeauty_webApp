"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthForm } from "@/components/AuthForm";
import { EmptyBox, ErrorBox, Loading } from "@/components/states";
import { PixelButton, SectionTitle } from "@/components/ui";
import { formatPrice } from "@/lib/format";
import { useApi } from "@/lib/useApi";
import type { LibraryEntry, Order } from "@/lib/types";

function SuccessBanner() {
  const params = useSearchParams();
  if (params.get("compra") !== "ok") return null;
  return (
    <div className="border-[3px] border-ink bg-blush-500 p-3 text-[11px] uppercase tracking-widest text-white shadow-pixel">
      ✓ Compra concluída! Os cursos já estão na tua biblioteca.
    </div>
  );
}

function Library() {
  const { data, error, loading } = useApi<LibraryEntry[]>("/library", { auth: true });
  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;
  if (!data || data.length === 0)
    return (
      <EmptyBox>
        Ainda não compraste nenhum curso.{" "}
        <Link href="/cursos" className="text-blush-600 underline">
          Ver cursos
        </Link>
      </EmptyBox>
    );
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data.map((e) => (
        <Link
          key={e.course.id}
          href={`/cursos/${e.course.slug}`}
          className="flex gap-3 border-[3px] border-ink bg-white p-3 shadow-pixel hover:-translate-y-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={e.course.coverUrl}
            alt={e.course.title}
            className="h-16 w-24 border-2 border-ink object-cover [image-rendering:pixelated]"
          />
          <div>
            <p className="text-[11px] text-ink">{e.course.title}</p>
            <p className="mt-1 text-[9px] uppercase text-blush-600">Assistir →</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function Orders() {
  const { data, error, loading } = useApi<Order[]>("/orders", { auth: true });
  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;
  if (!data || data.length === 0) return <EmptyBox>Sem pedidos.</EmptyBox>;
  return (
    <ul className="space-y-3">
      {data.map((o) => (
        <li key={o.id} className="border-[3px] border-ink bg-white p-3 shadow-pixel">
          <div className="flex justify-between text-[10px] uppercase text-ink-muted">
            <span>{new Date(o.createdAt).toLocaleDateString("pt-PT")}</span>
            <span className="text-blush-600">{o.status}</span>
          </div>
          <ul className="my-2 space-y-1 text-[10px]">
            {o.items.map((i) => (
              <li key={i.id} className="flex justify-between gap-2">
                <span>
                  {i.name} {i.quantity > 1 ? `×${i.quantity}` : ""}
                </span>
                <span>{formatPrice(i.priceCents * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="border-t-2 border-ink pt-1 text-right text-[11px] font-bold text-blush-700">
            {formatPrice(o.totalCents)}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function ContaPage() {
  const { user, loading, logout } = useAuth();
  const [tab, setTab] = useState<"biblioteca" | "pedidos">("biblioteca");

  if (loading) return <Loading />;

  if (!user) {
    return (
      <div className="mx-auto max-w-sm space-y-4">
        <SectionTitle kicker="Conta" title="Entra ou cria conta" />
        <p className="readable text-ink-muted">
          Com conta desbloqueias o provador completo, compras cursos e produtos, e acompanhas
          os teus pedidos.
        </p>
        <div className="border-[3px] border-ink bg-blush-50 p-4 shadow-pixel">
          <AuthForm />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionTitle kicker="Conta" title={`Olá, ${user.name.split(" ")[0]}`} />
        <PixelButton variant="ghost" size="sm" onClick={logout}>
          Sair
        </PixelButton>
      </div>
      <p className="text-[10px] uppercase tracking-widest text-ink-muted">{user.email}</p>

      <div className="flex gap-2">
        {(["biblioteca", "pedidos"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-[3px] border-ink px-3 py-1.5 text-[10px] uppercase tracking-widest ${
              tab === t ? "bg-blush-500 text-white shadow-pixel" : "bg-white text-ink"
            }`}
          >
            {t === "biblioteca" ? "Biblioteca" : "Pedidos"}
          </button>
        ))}
      </div>

      {tab === "biblioteca" ? <Library /> : <Orders />}
    </div>
  );
}
