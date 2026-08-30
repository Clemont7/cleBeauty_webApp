"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { AuthForm } from "@/components/AuthForm";
import { EmptyBox } from "@/components/states";
import { PixelButton, SectionTitle } from "@/components/ui";
import { api, ApiError } from "@/lib/api";
import { formatPrice } from "@/lib/format";

const inputClass =
  "w-full border-[3px] border-ink bg-white px-3 py-2 text-xs outline-none focus:shadow-pixel-pink";

export default function CheckoutPage() {
  const { user, loading, refresh } = useAuth();
  const { items, totalCents, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({ customerName: "", address: "", city: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) return null;

  if (!user) {
    return (
      <div className="mx-auto max-w-sm space-y-4">
        <SectionTitle kicker="Checkout" title="Entra para continuar" />
        <p className="readable text-ink-muted">
          Precisas de uma conta para finalizar a compra e receber o acesso aos cursos.
        </p>
        <div className="border-[3px] border-ink bg-blush-50 p-4 shadow-pixel">
          <AuthForm onSuccess={refresh} />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyBox>
        Não há nada para pagar.{" "}
        <Link href="/loja" className="text-blush-600 underline">
          Ir à loja
        </Link>
      </EmptyBox>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api("/checkout", {
        method: "POST",
        auth: true,
        body: {
          ...form,
          items: items.map((i) => ({ kind: i.kind, id: i.id, quantity: i.quantity })),
        },
      });
      clear();
      await refresh();
      router.push("/conta?compra=ok");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Não foi possível concluir a compra.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-4">
        <SectionTitle kicker="Checkout" title="Dados de entrega" />
        <form onSubmit={submit} className="grid gap-3">
          <label className="grid gap-1 text-[10px] uppercase tracking-widest">
            Nome completo
            <input
              className={inputClass}
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              required
              minLength={2}
            />
          </label>
          <label className="grid gap-1 text-[10px] uppercase tracking-widest">
            Morada
            <input
              className={inputClass}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
              minLength={3}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-[10px] uppercase tracking-widest">
              Cidade
              <input
                className={inputClass}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
                minLength={2}
              />
            </label>
            <label className="grid gap-1 text-[10px] uppercase tracking-widest">
              Telefone
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                minLength={6}
              />
            </label>
          </div>

          {error && (
            <p className="border-2 border-blush-600 bg-blush-50 px-2 py-1 text-[10px] text-blush-700">
              {error}
            </p>
          )}

          <PixelButton type="submit" disabled={busy}>
            {busy ? "A processar..." : `Pagar ${formatPrice(totalCents)} (simulado)`}
          </PixelButton>
        </form>
      </div>

      <aside className="h-fit border-[3px] border-ink bg-blush-50 p-4 shadow-pixel">
        <p className="mb-2 text-[10px] uppercase tracking-widest text-ink-muted">Resumo</p>
        <ul className="space-y-1 text-[10px]">
          {items.map((i) => (
            <li key={`${i.kind}:${i.id}`} className="flex justify-between gap-2">
              <span>
                {i.name} {i.kind === "product" && i.quantity > 1 ? `×${i.quantity}` : ""}
              </span>
              <span>{formatPrice(i.priceCents * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t-2 border-ink pt-2 text-[11px] font-bold">
          <span>Total</span>
          <span className="text-blush-700">{formatPrice(totalCents)}</span>
        </div>
      </aside>
    </div>
  );
}
