"use client";

import Link from "next/link";
import { CourseCard, ProductCard } from "@/components/cards";
import { ErrorBox, Loading } from "@/components/states";
import { PixelLink, SectionTitle } from "@/components/ui";
import { useApi } from "@/lib/useApi";
import type { CourseListItem, Product } from "@/lib/types";

export default function HomePage() {
  const products = useApi<Product[]>("/products");
  const courses = useApi<CourseListItem[]>("/courses");

  const featured = (products.data || []).filter((p) => p.featured).slice(0, 4);
  const topCourses = (courses.data || []).slice(0, 3);

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="border-[3px] border-ink bg-white shadow-pixel-lg">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
            <span className="inline-block w-fit bg-ink px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-blush-200">
              Academia · Loja · Provador
            </span>
            <h1 className="text-xl leading-tight text-ink sm:text-3xl">
              A tua beleza,
              <br />
              <span className="text-blush-600">pixel a pixel.</span>
            </h1>
            <p className="readable max-w-md text-ink-muted">
              Aprende automaquiagem com cursos passo a passo, compra os produtos que usamos,
              e experimenta batom, blush e sobrancelhas em tempo real antes de comprar.
            </p>
            <div className="flex flex-wrap gap-3">
              <PixelLink href="/cursos">Ver cursos</PixelLink>
              <PixelLink href="/provador" variant="ink">
                Abrir provador
              </PixelLink>
            </div>
          </div>
          <div className="relative min-h-[260px] border-t-[3px] border-ink md:border-l-[3px] md:border-t-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/cle-hero/800/900"
              alt="Clé Beauty"
              className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
            />
            <div className="absolute bottom-3 right-3 flex flex-wrap gap-1">
              {["#ffcce7", "#ff9ad1", "#f641a5", "#d92683", "#901754"].map((c) => (
                <span key={c} className="h-4 w-4 border-2 border-ink" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["01", "Vê sem conta", "Explora a loja e o resumo dos cursos. Experimenta 1 filtro de maquilhagem."],
          ["02", "Cria conta grátis", "Desbloqueia o provador completo e podes comprar cursos e produtos."],
          ["03", "Compra e aprende", "Checkout simples, acesso imediato às aulas e envio dos produtos."],
        ].map(([n, t, d]) => (
          <div key={n} className="border-[3px] border-ink bg-blush-50 p-4 shadow-pixel">
            <p className="font-display text-sm text-blush-600">{n}</p>
            <p className="mt-2 text-[11px] text-ink">{t}</p>
            <p className="readable mt-1 text-[10px] text-ink-muted">{d}</p>
          </div>
        ))}
      </section>

      {/* COURSES */}
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle kicker="Academia" title="Cursos de automaquiagem" />
          <Link href="/cursos" className="text-[10px] uppercase tracking-widest text-blush-600 underline">
            Ver todos
          </Link>
        </div>
        {courses.loading && <Loading />}
        {courses.error && <ErrorBox message={courses.error} />}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle kicker="Loja" title="Em destaque" />
          <Link href="/loja" className="text-[10px] uppercase tracking-widest text-blush-600 underline">
            Ver loja
          </Link>
        </div>
        {products.loading && <Loading />}
        {products.error && <ErrorBox message={products.error} />}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* TRY-ON CTA */}
      <section className="border-[3px] border-ink bg-ink p-6 text-blush-100 shadow-pixel-pink sm:p-10">
        <h2 className="text-base text-white sm:text-xl">Experimenta antes de comprar</h2>
        <p className="readable mt-2 max-w-lg text-blush-200/80">
          O provador virtual usa a tua câmara para aplicar tons de batom, blush e sobrancelha em
          tempo real. Sem conta experimentas 1 tom; com conta experimentas todos.
        </p>
        <PixelLink href="/provador" variant="pink" className="mt-4">
          Abrir provador
        </PixelLink>
      </section>
    </div>
  );
}
