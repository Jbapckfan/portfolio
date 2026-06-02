import type { Metadata } from "next";
import { Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Exploded — Darkroom",
  description: "Scroll-driven exploded hero. GSAP ScrollTrigger + Lenis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-ink text-bone font-mono antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
