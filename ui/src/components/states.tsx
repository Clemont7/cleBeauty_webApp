export function Loading({ label = "A carregar..." }: { label?: string }) {
  return (
    <p className="animate-blink py-10 text-center text-[11px] uppercase tracking-[0.3em] text-blush-600">
      {label}
    </p>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="my-6 border-[3px] border-blush-600 bg-blush-50 p-4 text-[11px] leading-relaxed text-blush-800 shadow-pixel">
      <p className="mb-1 font-bold uppercase tracking-widest">Erro</p>
      {message}
    </div>
  );
}

export function EmptyBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 border-[3px] border-dashed border-ink/40 p-8 text-center text-[11px] text-ink-muted">
      {children}
    </div>
  );
}
