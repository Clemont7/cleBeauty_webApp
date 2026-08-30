import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = {
  variant?: "pink" | "ink" | "ghost";
  size?: "sm" | "md";
} & ComponentProps<"button">;

const base =
  "inline-flex items-center justify-center gap-2 border-[3px] font-pixel font-bold uppercase tracking-wider transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed";

const variants = {
  pink: "border-ink bg-blush-500 text-white shadow-pixel hover:bg-blush-600",
  ink: "border-ink bg-ink text-white shadow-pixel-pink hover:bg-ink-soft",
  ghost: "border-ink bg-white text-ink shadow-pixel hover:bg-blush-50",
};

const sizes = { sm: "px-3 py-1.5 text-[11px]", md: "px-5 py-3 text-xs" };

export function PixelButton({
  variant = "pink",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}

export function PixelLink({
  href,
  variant = "pink",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: "pink" | "ink" | "ghost";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </Link>
  );
}

export function SectionTitle({
  kicker,
  title,
  className = "",
}: {
  kicker?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {kicker && (
        <span className="mb-2 inline-block bg-ink px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-blush-200">
          {kicker}
        </span>
      )}
      <h2 className="text-lg leading-snug text-ink sm:text-2xl">{title}</h2>
    </div>
  );
}

export function PixelBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border-2 border-ink bg-blush-100 px-2 py-0.5 text-[10px] uppercase tracking-widest">
      {children}
    </span>
  );
}
