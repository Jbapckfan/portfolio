import Link from "next/link";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";

import PortfolioHero from "@/components/portfolio/PortfolioHero";
import Manifesto from "@/components/portfolio/Manifesto";
import About from "@/components/portfolio/About";
import Flagship from "@/components/portfolio/Flagship";
import Work from "@/components/portfolio/Work";
import FeatureReveal from "@/components/portfolio/FeatureReveal";
import StackMarquee from "@/components/portfolio/StackMarquee";
import Process from "@/components/portfolio/Process";
import Statement from "@/components/portfolio/Statement";
import DeployTerminal from "@/components/portfolio/DeployTerminal";
import Contact from "@/components/portfolio/Contact";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "James Alford — Portfolio",
  description: "AI apps, websites, and SaaS built at the edge of medicine and code.",
};

export default function Home() {
  return (
    <main className={`lab ${display.variable} ${mono.variable} min-h-screen bg-ink font-mono text-bone`}>
      <Link
        href="/demos"
        className="fixed right-6 top-6 z-[60] border border-sulfur/40 bg-ink/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-sulfur backdrop-blur transition-colors hover:bg-sulfur hover:text-ink md:right-10 md:top-10"
      >
        motion demos →
      </Link>

      <PortfolioHero />
      <Manifesto />
      <About />
      <Flagship />
      <Work />
      <FeatureReveal />
      <StackMarquee />
      <Process />
      <Statement />
      <DeployTerminal />
      <Contact />

      <footer className="border-t border-ash/30 px-8 py-12 font-mono text-xs uppercase tracking-[0.3em] text-ash">
        © {new Date().getFullYear()} James Alford · built with Next.js + GSAP ·{" "}
        <Link href="/lens" className="text-sulfur hover:underline">
          photography ↗
        </Link>
      </footer>
    </main>
  );
}
