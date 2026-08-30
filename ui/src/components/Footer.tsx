export function Footer() {
  return (
    <footer className="mt-16 border-t-[3px] border-ink bg-ink text-blush-100">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-xs text-white">
            CLÉ<span className="text-blush-400">BEAUTY</span>
          </p>
          <p className="mt-2 text-[10px] leading-relaxed text-blush-200/70">
            Academia de automaquiagem, loja de maquilhagem e cabelo, e provador virtual.
          </p>
        </div>
        <div className="text-[10px] uppercase tracking-widest">
          <p className="mb-2 text-blush-400">Navegar</p>
          <p>Loja</p>
          <p>Cursos</p>
          <p>Provador</p>
        </div>
        <div className="text-[10px] uppercase tracking-widest">
          <p className="mb-2 text-blush-400">Social</p>
          <p>Instagram</p>
          <p>TikTok</p>
          <p>WhatsApp</p>
        </div>
      </div>
      <div className="border-t border-blush-100/10 px-4 py-4 text-center text-[9px] uppercase tracking-[0.3em] text-blush-200/50">
        © {new Date().getFullYear()} Clé Beauty
      </div>
    </footer>
  );
}
