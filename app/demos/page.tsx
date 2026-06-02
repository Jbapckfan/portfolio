import Link from "next/link";
import ExplodedHero from "@/components/ExplodedHero";
import TextShatter from "@/components/effects/TextShatter";
import HorizontalScroll from "@/components/effects/HorizontalScroll";
import StickyScale from "@/components/effects/StickyScale";
import VelocityMarquee from "@/components/effects/VelocityMarquee";
import TiltCards from "@/components/effects/TiltCards";
import Magnetic from "@/components/effects/Magnetic";
import ParallaxDepth from "@/components/effects/ParallaxDepth";
import ClipReveal from "@/components/effects/ClipReveal";

export default function Demos() {
  return (
    <main className="bg-ink">
      <nav className="fixed right-6 top-6 z-[60] flex gap-2 md:right-10 md:top-10">
        {[
          ["/", "portfolio"],
          ["/lab", "lab"],
          ["/lens", "lens"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="border border-sulfur/40 bg-ink/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sulfur backdrop-blur transition-colors hover:bg-sulfur hover:text-ink"
          >
            {label} →
          </Link>
        ))}
      </nav>

      {/* 01 — the exploded hero (its own chrome labels it "001") */}
      <ExplodedHero />
      <TextShatter />
      <HorizontalScroll />
      <StickyScale />
      <VelocityMarquee />
      <TiltCards />
      <Magnetic />
      <ParallaxDepth />
      <ClipReveal />

      <footer className="border-t border-ash/20 px-8 py-14 text-xs uppercase tracking-[0.3em] text-ash">
        Darkroom — effects catalog · scroll through, pick your favorites
      </footer>
    </main>
  );
}
