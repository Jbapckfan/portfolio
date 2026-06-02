"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth-scroll provider, wired into GSAP's ticker so ScrollTrigger
 * reads Lenis's virtual scroll position (the correct way to combine them).
 * Disables itself under prefers-reduced-motion.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic — calm, weighty
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Dev convenience: lets tooling freeze all GSAP tweens for stable captures.
    (window as unknown as { gsap?: typeof gsap }).gsap = gsap;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
