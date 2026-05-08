const data = [
  { title: "Noiva Soft Glam", description: "Visual limpo e sofisticado", price: "3.500 MZN", duration: "90 min" },
  { title: "Editorial Natural", description: "Ideal para fotografia", price: "2.800 MZN", duration: "70 min" }
];

export default function ServicesPage() {
  return (
    <section className="grid gap-4">
      {data.map((s) => (
        <div key={s.title} className="rounded-2xl border border-blush-200 bg-white p-6">
          <h1 className="text-xl font-semibold text-blush-700">{s.title}</h1>
          <p>{s.description}</p>
          <p>{s.price} · {s.duration}</p>
          <button className="mt-3 rounded-full bg-blush-500 px-4 py-2 text-white">Marcar</button>
        </div>
      ))}
    </section>
  );
}
