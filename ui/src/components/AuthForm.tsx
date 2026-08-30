"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import { PixelButton } from "./ui";

const inputClass =
  "w-full border-[3px] border-ink bg-white px-3 py-2 text-xs outline-none focus:shadow-pixel-pink";

export function AuthForm({ onSuccess }: { onSuccess?: () => void }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "login") await login(email.trim(), password);
      else await register(name.trim(), email.trim(), password);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Ocorreu um erro.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={`flex-1 border-[3px] border-ink px-3 py-2 text-[11px] uppercase tracking-widest ${
              mode === m ? "bg-blush-500 text-white shadow-pixel" : "bg-white text-ink"
            }`}
          >
            {m === "login" ? "Entrar" : "Criar conta"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="grid gap-3">
        {mode === "register" && (
          <label className="grid gap-1 text-[10px] uppercase tracking-widest">
            Nome
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
            />
          </label>
        )}
        <label className="grid gap-1 text-[10px] uppercase tracking-widest">
          Email
          <input
            className={inputClass}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="grid gap-1 text-[10px] uppercase tracking-widest">
          Palavra-passe
          <input
            className={inputClass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>

        {error && (
          <p className="border-2 border-blush-600 bg-blush-50 px-2 py-1 text-[10px] text-blush-700">
            {error}
          </p>
        )}

        <PixelButton type="submit" disabled={busy}>
          {busy ? "..." : mode === "login" ? "Entrar" : "Criar conta"}
        </PixelButton>
      </form>

      <p className="mt-3 text-[10px] leading-relaxed text-ink-muted">
        Conta de demonstração: <b>demo@clebeauty.com</b> / <b>clebeauty123</b>
      </p>
    </div>
  );
}
