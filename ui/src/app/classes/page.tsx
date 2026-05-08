const classesData = [
  {
    name: "Base perfeita minimalista",
    description: "Preparação de pele e acabamento",
    video: "Vídeo bloqueado até inscrição"
  },
  {
    name: "Penteado natural para eventos",
    description: "Técnicas práticas",
    video: "Vídeo bloqueado até compra"
  }
];

export default function ClassesPage() {
  return (
    <section className="space-y-4">
      {classesData.map((c) => (
        <article key={c.name} className="rounded-2xl border border-blush-200 bg-white p-6">
          <h1 className="text-xl font-semibold text-blush-700">{c.name}</h1>
          <p>{c.description}</p>
          <p className="mt-2 text-sm text-blush-600">{c.video}</p>
        </article>
      ))}
    </section>
  );
}
