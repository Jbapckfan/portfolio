"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Parallax Depth — layered interstitial statement. */
export default function Statement() {
  const sec = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const st = { trigger: sec.current, start: "top bottom", end: "bottom top", scrub: 1 } as const;
      gsap.to(".st-bg", { yPercent: 28, ease: "none", scrollTrigger: st });
      gsap.to(".st-mid", { yPercent: -18, ease: "none", scrollTrigger: st });
      gsap.to(".st-fg", { yPercent: -52, ease: "none", scrollTrigger: st });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="relative flex h-screen items-center justify-center overflow-hidden bg-ink">
      <span className="st-bg pointer-events-none absolute select-none font-display font-bold leading-none tracking-tightest text-sulfur/10 text-[clamp(10rem,40vw,38rem)]">
        SHIP
      </span>
      <p className="st-mid relative max-w-4xl px-6 text-center font-display font-bold leading-[0.95] tracking-tightest text-bone text-[clamp(2rem,6vw,5rem)]">
        Open to building your next product.
      </p>
      <span className="st-fg absolute bottom-20 font-mono text-xs uppercase tracking-[0.4em] text-sulfur">
        ai · web · mobile · saas
      </span>
    </section>
  );
}
