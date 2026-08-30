import "./globals.css";
import type { Metadata } from "next";
import { Press_Start_2P, Silkscreen } from "next/font/google";
import { Providers } from "@/components/Providers";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const display = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const pixel = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clé Beauty — Academia & Loja",
  description:
    "Cursos de automaquiagem, produtos de maquilhagem e cabelo, e provador virtual de batom, blush e sobrancelhas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${display.variable} ${pixel.variable}`}>
      <body>
        <Providers>
          <NavBar />
          <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
