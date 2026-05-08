export default function PortfolioPage() {
  const images = ["Antes/Depois - Noiva", "Look Diário", "Estilo Editorial", "Penteado Natural"];

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold text-blush-700">Portfólio</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((item) => (
          <div key={item} className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-blush-300 bg-white text-center text-blush-700">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
