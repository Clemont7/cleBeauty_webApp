export default function BookingPage() {
  return (
    <section className="rounded-2xl border border-blush-200 bg-white p-6">
      <h1 className="text-2xl font-semibold text-blush-700">Marcação</h1>
      <form className="mt-5 grid gap-3 md:grid-cols-2">
        <input className="rounded-lg border p-3" placeholder="Nome" />
        <input className="rounded-lg border p-3" placeholder="Contacto" />
        <input className="rounded-lg border p-3" placeholder="Serviço" />
        <input className="rounded-lg border p-3" type="date" />
        <input className="rounded-lg border p-3" type="time" />
        <button className="rounded-lg bg-blush-500 p-3 font-semibold text-white">Confirmar marcação</button>
      </form>
    </section>
  );
}
