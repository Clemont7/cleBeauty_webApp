"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { useCart } from "@/context/CartContext";
import { ErrorBox, Loading } from "@/components/states";
import { PixelButton, PixelBadge } from "@/components/ui";
import { formatPrice } from "@/lib/format";
import { useApi } from "@/lib/useApi";
import type { Course } from "@/lib/types";

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const authModal = useAuthModal();
  const { add, has } = useCart();

  const { data: course, error, loading, reload } = useApi<Course>(`/courses/${slug}`, { auth: true });
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  // re-fetch when auth state changes (enrollment / locked videos)
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    if (course && !activeLesson) {
      const first = course.lessons.find((l) => !l.locked) || course.lessons[0];
      if (first) setActiveLesson(first.id);
    }
  }, [course, activeLesson]);

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;
  if (!course) return null;

  const inCart = has("course", course.id);
  const current = course.lessons.find((l) => l.id === activeLesson);

  function buy() {
    add({
      kind: "course",
      id: course!.id,
      name: course!.title,
      priceCents: course!.priceCents,
      imageUrl: course!.coverUrl,
    });
    if (!user) {
      authModal.open("Cria conta para concluíres a compra do curso e teres acesso às aulas.");
      return;
    }
    router.push("/carrinho");
  }

  return (
    <div className="space-y-6">
      <Link href="/cursos" className="text-[10px] uppercase tracking-widest text-blush-600 underline">
        ← Voltar aos cursos
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {/* player / cover */}
          <div className="relative aspect-video border-[3px] border-ink bg-ink shadow-pixel">
            {course.enrolled || current?.freePreview ? (
              current?.videoUrl ? (
                <video
                  key={current.id}
                  src={current.videoUrl}
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full place-items-center text-[11px] text-blush-200">
                  Escolhe uma aula
                </div>
              )
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.coverUrl}
                  alt={course.title}
                  className="h-full w-full object-cover opacity-40 [image-rendering:pixelated]"
                />
                <div className="absolute inset-0 grid place-items-center p-4 text-center">
                  <div>
                    <p className="font-display text-xs text-white">AULAS BLOQUEADAS</p>
                    <p className="readable mt-2 text-[10px] text-blush-200">
                      Compra o curso para dar play. Podes ver o programa completo abaixo.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PixelBadge>{course.level}</PixelBadge>
            <PixelBadge>{course.lessons.length} aulas</PixelBadge>
            {course.enrolled && <PixelBadge>Adquirido</PixelBadge>}
          </div>

          <h1 className="text-lg leading-snug text-ink sm:text-2xl">{course.title}</h1>
          <p className="readable text-ink-muted">{course.description}</p>
        </div>

        {/* sidebar */}
        <aside className="space-y-4">
          <div className="border-[3px] border-ink bg-blush-50 p-4 shadow-pixel">
            <p className="text-xl font-bold text-blush-700">{formatPrice(course.priceCents)}</p>
            <p className="readable mt-1 text-[10px] text-ink-muted">Pagamento único · acesso vitalício</p>
            {course.enrolled ? (
              <p className="mt-3 border-2 border-ink bg-white px-2 py-2 text-center text-[10px] uppercase tracking-widest">
                Já tens acesso
              </p>
            ) : (
              <PixelButton className="mt-3 w-full" onClick={buy} disabled={inCart}>
                {inCart ? "No saco" : "Comprar curso"}
              </PixelButton>
            )}
          </div>

          <div className="border-[3px] border-ink bg-white shadow-pixel">
            <p className="border-b-[3px] border-ink bg-ink px-3 py-2 text-[10px] uppercase tracking-widest text-blush-200">
              Programa
            </p>
            <ul>
              {course.lessons.map((l) => {
                const watchable = !l.locked;
                return (
                  <li key={l.id} className="border-b-2 border-ink/10 last:border-0">
                    <button
                      disabled={!watchable}
                      onClick={() => setActiveLesson(l.id)}
                      className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[10px] ${
                        l.id === activeLesson ? "bg-blush-100" : ""
                      } ${watchable ? "hover:bg-blush-50" : "opacity-60"}`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{watchable ? "▶" : "🔒"}</span>
                        {l.title}
                      </span>
                      <span className="shrink-0 text-ink-muted">
                        {l.freePreview && !course.enrolled ? "grátis" : l.durationLabel}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
