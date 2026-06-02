import Link from "next/link";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";

import NeuralField from "@/components/lab/NeuralField";
import DecryptText from "@/components/lab/DecryptText";
import StackingCards from "@/components/lab/StackingCards";
import GenerativeReveal from "@/components/lab/GenerativeReveal";
import CircuitDraw from "@/components/lab/CircuitDraw";
import DraggableGallery from "@/components/lab/DraggableGallery";
import TerminalType from "@/components/lab/TerminalType";
import GooeyCursor from "@/components/lab/GooeyCursor";

// Tech/AI type system — grotesk display + technical mono, scoped to /lab.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lab — Synthetic Motion",
  description: "AI/tech-themed motion catalog. Canvas, DrawSVG, Draggable, gooey cursor.",
};

export default function Lab() {
  return (
    <main
      className={`lab lab-scan ${display.variable} ${mono.variable} min-h-screen bg-ink font-mono text-bone`}
    >
      <Link
        href="/demos"
        className="fixed right-6 top-6 z-[60] border border-sulfur/40 bg-ink/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-sulfur backdrop-blur transition-colors hover:bg-sulfur hover:text-ink md:right-10 md:top-10"
      >
        ← demos
      </Link>

      <NeuralField />
      <DecryptText />
      <StackingCards />
      <GenerativeReveal />
      <CircuitDraw />
      <DraggableGallery />
      <TerminalType />
      <GooeyCursor />

      <footer className="border-t border-ash/30 px-8 py-14 font-mono text-xs uppercase tracking-[0.3em] text-ash">
        darkroom // lab — synthetic motion catalog
      </footer>
    </main>
  );
}
