"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { useCart } from "@/context/CartContext";
import { ErrorBox, Loading } from "@/components/states";
import { PixelButton, SectionTitle } from "@/components/ui";
import { formatPrice } from "@/lib/format";
import { paintBlush, paintBrows, paintLips, type Pt } from "@/lib/facePaint";
import { useApi } from "@/lib/useApi";
import type { FilterType, Product } from "@/lib/types";

const WASM_CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

const TRIED_KEY = "cle.tryon.tried";
const TYPE_LABEL: Record<FilterType, string> = {
  lipstick: "Batom",
  blush: "Blush",
  brow: "Sobrancelha",
};

function readTried(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(TRIED_KEY) || "[]");
  } catch {
    return [];
  }
}

function ProvadorInner() {
  const params = useSearchParams();
  const { user } = useAuth();
  const authModal = useAuthModal();
  const { add } = useCart();
  const { data: filters, error, loading } = useApi<Product[]>("/products/filters");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const landmarkerRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const lastVideoTime = useRef<number>(-1);

  const [stage, setStage] = useState<"idle" | "loading" | "live" | "error">("idle");
  const [stageError, setStageError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(0.7);
  const [faceFound, setFaceFound] = useState(false);

  const grouped = useMemo(() => {
    const g: Record<string, Product[]> = {};
    for (const f of filters || []) {
      if (!f.filterType) continue;
      (g[f.filterType] ||= []).push(f);
    }
    return g;
  }, [filters]);

  const active = (filters || []).find((f) => f.id === activeId) || null;

  const canTry = useCallback(
    (id: string) => {
      if (user) return true;
      const tried = readTried();
      if (tried.includes(id)) return true;
      return tried.length < 1;
    },
    [user],
  );

  const selectFilter = useCallback(
    (id: string) => {
      if (!canTry(id)) {
        authModal.open(
          "Sem conta podes experimentar 1 tom. Cria conta grátis para experimentares todos os filtros de batom, blush e sobrancelha.",
        );
        return;
      }
      if (!user) {
        try {
          const tried = Array.from(new Set([...readTried(), id]));
          window.localStorage.setItem(TRIED_KEY, JSON.stringify(tried));
        } catch {
          /* ignore */
        }
      }
      setActiveId(id);
    },
    [authModal, canTry, user],
  );

  // preselect from ?product=
  useEffect(() => {
    const pid = params.get("product");
    if (pid && filters?.some((f) => f.id === pid) && !activeId) {
      selectFilter(pid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, filters]);

  const renderFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const lm = landmarkerRef.current;
    if (!video || !canvas || !lm) {
      rafRef.current = requestAnimationFrame(renderFrame);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (ctx && video.readyState >= 2) {
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
      const now = performance.now();
      let result: { faceLandmarks?: Pt[][] } | null = null;
      if (video.currentTime !== lastVideoTime.current) {
        lastVideoTime.current = video.currentTime;
        try {
          result = lm.detectForVideo(video, now);
        } catch {
          result = null;
        }
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = result?.faceLandmarks?.[0];
      setFaceFound(!!pts);
      if (pts && active?.filterColor && active.filterType) {
        // canvas + video are both CSS-mirrored, so draw in native coords
        if (active.filterType === "lipstick")
          paintLips(ctx, pts, canvas.width, canvas.height, active.filterColor, intensity);
        if (active.filterType === "blush")
          paintBlush(ctx, pts, canvas.width, canvas.height, active.filterColor, intensity);
        if (active.filterType === "brow")
          paintBrows(ctx, pts, canvas.width, canvas.height, active.filterColor, intensity);
      }
    }
    rafRef.current = requestAnimationFrame(renderFrame);
  }, [active, intensity]);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStage("idle");
    setFaceFound(false);
  }, []);

  const start = useCallback(async () => {
    setStage("loading");
    setStageError(null);
    try {
      const vision = await import("@mediapipe/tasks-vision");
      const fileset = await vision.FilesetResolver.forVisionTasks(WASM_CDN);
      landmarkerRef.current = await vision.FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
        runningMode: "VIDEO",
        numFaces: 1,
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();
      setStage("live");
      rafRef.current = requestAnimationFrame(renderFrame);
    } catch (e) {
      const msg =
        e instanceof DOMException && e.name === "NotAllowedError"
          ? "Permissão de câmara negada. Autoriza o acesso à câmara no navegador e tenta de novo."
          : "Não foi possível iniciar a câmara ou carregar o modelo de deteção facial. Verifica a ligação à internet e as permissões.";
      setStageError(msg);
      setStage("error");
    }
  }, [renderFrame]);

  useEffect(() => () => stop(), [stop]);

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;

  return (
    <div className="space-y-6">
      <SectionTitle kicker="Provador" title="Experimenta batom, blush e sobrancelha" />
      <p className="readable max-w-xl text-ink-muted">
        {user
          ? "Escolhe um tom e vê aplicado na tua câmara em tempo real."
          : "Sem conta podes experimentar 1 tom. Cria conta grátis para desbloquear todos."}
      </p>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* STAGE */}
        <div className="crt relative aspect-[4/3] overflow-hidden border-[3px] border-ink bg-ink shadow-pixel-lg">
          <video
            ref={videoRef}
            playsInline
            muted
            className="absolute inset-0 h-full w-full -scale-x-100 object-cover"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full -scale-x-100 object-cover"
          />

          {stage !== "live" && (
            <div className="absolute inset-0 grid place-items-center bg-ink/80 p-6 text-center">
              {stage === "loading" ? (
                <p className="animate-blink text-[11px] uppercase tracking-[0.3em] text-blush-200">
                  A ligar câmara...
                </p>
              ) : stage === "error" ? (
                <div className="space-y-3">
                  <p className="readable text-[10px] text-blush-200">{stageError}</p>
                  <PixelButton size="sm" onClick={start}>
                    Tentar de novo
                  </PixelButton>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="font-display text-xs text-white">PROVADOR VIRTUAL</p>
                  <p className="readable text-[10px] text-blush-200">
                    Vamos usar a tua câmara. Nada é gravado nem enviado.
                  </p>
                  <PixelButton size="sm" onClick={start}>
                    Ativar câmara
                  </PixelButton>
                </div>
              )}
            </div>
          )}

          {stage === "live" && (
            <div className="absolute left-2 top-2 flex items-center gap-2 border-2 border-ink bg-white/90 px-2 py-1 text-[9px] uppercase">
              <span
                className={`h-2 w-2 ${faceFound ? "bg-green-500" : "bg-blush-500 animate-blink"}`}
              />
              {faceFound ? "Rosto detetado" : "À procura de rosto"}
            </div>
          )}
          {stage === "live" && (
            <button
              onClick={stop}
              className="absolute right-2 top-2 border-2 border-ink bg-white px-2 py-1 text-[9px] uppercase"
            >
              Parar
            </button>
          )}
        </div>

        {/* CONTROLS */}
        <div className="space-y-5">
          <div>
            <label className="mb-1 flex justify-between text-[10px] uppercase tracking-widest">
              <span>Intensidade</span>
              <span>{Math.round(intensity * 100)}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-blush-500"
            />
          </div>

          {(["lipstick", "blush", "brow"] as FilterType[]).map((type) =>
            grouped[type]?.length ? (
              <div key={type}>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-ink-muted">
                  {TYPE_LABEL[type]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {grouped[type].map((f) => {
                    const locked = !canTry(f.id);
                    return (
                      <button
                        key={f.id}
                        onClick={() => selectFilter(f.id)}
                        title={f.shade || f.name}
                        className={`relative h-10 w-10 border-[3px] ${
                          activeId === f.id ? "border-blush-500 shadow-pixel-pink" : "border-ink"
                        }`}
                        style={{ backgroundColor: f.filterColor || "#ccc" }}
                      >
                        {locked && (
                          <span className="absolute inset-0 grid place-items-center bg-ink/50 text-[10px]">
                            🔒
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null,
          )}

          {active && (
            <div className="border-[3px] border-ink bg-blush-50 p-3 shadow-pixel">
              <p className="text-[11px] text-ink">{active.name}</p>
              <p className="text-[10px] text-ink-muted">{active.shade}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-blush-700">
                  {formatPrice(active.priceCents)}
                </span>
                <PixelButton
                  size="sm"
                  onClick={() =>
                    add({
                      kind: "product",
                      id: active.id,
                      name: active.name,
                      priceCents: active.priceCents,
                      imageUrl: active.imageUrl,
                    })
                  }
                >
                  Adicionar ao saco
                </PixelButton>
              </div>
            </div>
          )}

          {!user && (
            <button
              onClick={() => authModal.open("Cria conta grátis para experimentar todos os tons.")}
              className="w-full border-[3px] border-ink bg-ink px-3 py-2 text-[10px] uppercase tracking-widest text-blush-100 shadow-pixel-pink"
            >
              Criar conta para desbloquear tudo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProvadorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProvadorInner />
    </Suspense>
  );
}
