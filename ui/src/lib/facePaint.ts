// Canonical MediaPipe FaceMesh landmark index loops used by the try-on studio.

export const LIPS_OUTER = [
  61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84,
  181, 91, 146,
];

export const LIPS_INNER = [
  78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87,
  178, 88, 95,
];

// subject's right brow (appears on the left of a non-mirrored image)
export const BROW_RIGHT = [70, 63, 105, 66, 107, 55, 65, 52, 53, 46];
// subject's left brow
export const BROW_LEFT = [336, 296, 334, 293, 300, 285, 295, 282, 283, 276];

// approximate cheek centres + a reference point to scale the blush radius
export const CHEEK_LEFT = 280;
export const CHEEK_RIGHT = 50;
export const FACE_LEFT = 234;
export const FACE_RIGHT = 454;

export type Pt = { x: number; y: number; z?: number };

function poly(ctx: CanvasRenderingContext2D, pts: Pt[], idx: number[], w: number, h: number) {
  idx.forEach((i, n) => {
    const p = pts[i];
    if (!p) return;
    const x = p.x * w;
    const y = p.y * h;
    if (n === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
}

export function paintLips(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  w: number,
  h: number,
  color: string,
  intensity: number,
) {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.35 + intensity * 0.5;
  ctx.fillStyle = color;
  ctx.beginPath();
  poly(ctx, pts, LIPS_OUTER, w, h);
  poly(ctx, pts, LIPS_INNER, w, h);
  ctx.fill("evenodd");
  ctx.restore();
}

export function paintBrows(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  w: number,
  h: number,
  color: string,
  intensity: number,
) {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.35 + intensity * 0.55;
  ctx.strokeStyle = color;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  const scale = Math.abs((pts[FACE_RIGHT]?.x ?? 0.7) - (pts[FACE_LEFT]?.x ?? 0.3)) * w;
  ctx.lineWidth = Math.max(3, scale * 0.03);
  for (const brow of [BROW_LEFT, BROW_RIGHT]) {
    ctx.beginPath();
    brow.forEach((i, n) => {
      const p = pts[i];
      if (!p) return;
      const x = p.x * w;
      const y = p.y * h;
      if (n === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }
  ctx.restore();
}

export function paintBlush(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  w: number,
  h: number,
  color: string,
  intensity: number,
) {
  const faceW = Math.abs((pts[FACE_RIGHT]?.x ?? 0.7) - (pts[FACE_LEFT]?.x ?? 0.3)) * w;
  const radius = Math.max(20, faceW * 0.22);
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  for (const idx of [CHEEK_LEFT, CHEEK_RIGHT]) {
    const p = pts[idx];
    if (!p) continue;
    const cx = p.x * w;
    const cy = p.y * h;
    const g = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);
    const a = 0.25 + intensity * 0.45;
    g.addColorStop(0, hexWithAlpha(color, a));
    g.addColorStop(1, hexWithAlpha(color, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function hexWithAlpha(hex: string, alpha: number): string {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
