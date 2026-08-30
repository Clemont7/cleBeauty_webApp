"use client";

import { CourseCard } from "@/components/cards";
import { ErrorBox, Loading } from "@/components/states";
import { SectionTitle } from "@/components/ui";
import { useApi } from "@/lib/useApi";
import type { CourseListItem } from "@/lib/types";

export default function CursosPage() {
  const { data, error, loading } = useApi<CourseListItem[]>("/courses");

  return (
    <div className="space-y-6">
      <SectionTitle
        kicker="Academia"
        title="Cursos de automaquiagem e cabelo"
      />
      <p className="readable max-w-xl text-ink-muted">
        Vês o resumo e o programa de cada curso sem conta. Para assistir às aulas em vídeo,
        cria conta e compra o curso — o acesso fica disponível de imediato.
      </p>

      {loading && <Loading />}
      {error && <ErrorBox message={error} />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(data || []).map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}
