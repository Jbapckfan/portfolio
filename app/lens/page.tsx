import Link from "next/link";
import { Fraunces, Archivo } from "next/font/google";
import type { Metadata } from "next";

import LensHero from "@/components/lens/LensHero";
import LensIntro from "@/components/lens/LensIntro";
import LensFeature from "@/components/lens/LensFeature";
import LensParallax from "@/components/lens/LensParallax";
import LensSticky from "@/components/lens/LensSticky";
import LensGallery from "@/components/lens/LensGallery";
import LensGrid from "@/components/lens/LensGrid";
import LensContact from "@/components/lens/LensContact";

// Gallery type system — characterful serif + clean grotesk, scoped to /lens.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Archivo({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "James Alford — Aerial & Field Photography",
  description: "Landscape and drone photography. Commissions, prints, aerial work.",
};

export default function Lens() {
  return (
    <main className={`lens ${display.variable} ${sans.variable} min-h-screen bg-ink font-sans text-bone`}>
      <Link
        href="/demos"
        className="fixed right-6 top-6 z-[60] border border-bone/30 bg-ink/50 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.3em] text-bone backdrop-blur transition-colors hover:bg-bone hover:text-ink md:right-10 md:top-10"
      >
        ← demos
      </Link>

      <LensHero />
      <LensIntro />
      <LensFeature />
      <LensParallax />
      <LensSticky />
      <LensGallery />
      <LensGrid />
      <LensContact />

      <footer className="border-t border-ash/30 px-8 py-12 font-sans text-xs uppercase tracking-[0.3em] text-ash">
        © {new Date().getFullYear()} James Alford · aerial &amp; field photography
      </footer>
    </main>
  );
}
