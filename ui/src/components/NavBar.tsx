import Link from "next/link";

export function NavBar() {
  const links = [
    ["/", "Início"],
    ["/services", "Serviços"],
    ["/booking", "Marcar"],
    ["/classes", "Aulas"],
    ["/portfolio", "Portfólio"],
    ["/login", "Login"]
  ];

  return (
    <header className="border-b border-blush-200 bg-white/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <p className="text-2xl font-semibold text-blush-700">Clé Beauty</p>
        <div className="flex gap-3 text-sm font-medium text-blush-800">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="rounded-full bg-blush-100 px-4 py-2 hover:bg-blush-200">
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
