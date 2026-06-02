"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const PATHS = [
  "M0 120 H180 L230 70 H420 L470 120 H700 L760 60 H980 L1040 120 H1280",
  "M0 220 H120 L180 160 H520 L560 220 H840 L900 280 H1280",
  "M0 320 H300 L360 260 H640 L700 320 H940 L1000 380 H1280",
];
const STEPS = [
  ["01", "Understand the floor", "Real clinical or user pain — observed, not assumed."],
  ["02", "Prototype fast", "Ship a thin slice, put it in hands, learn."],
  ["03", "Productionize", "Own the stack to deploy — reliable, private, fast."],
];

/** Signal Routing — circuit traces draw on scroll, mapping how I work. */
export default function Process() {
  const sec = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pf-path",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          stagger: 0.15,
          scrollTrigger: { trigger: sec.current, start: "top 70%", end: "bottom 65%", scrub: 1 },
        }
      );
      gsap.fromTo(
        ".pf-node",
        { scale: 0, transformOrigin: "center" },
        {
          scale: 1,
          ease: "back.out(2)",
          stagger: 0.05,
          scrollTrigger: { trigger: sec.current, start: "top 55%", end: "bottom 65%", scrub: 1 },
        }
      );
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="relative flex min-h-screen flex-col justify-center gap-12 bg-ink px-6 py-24 md:px-16">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-ash">process</p>
        <h2 className="mt-3 font-display font-bold leading-[0.9] tracking-tightest text-bone text-[clamp(2rem,7vw,5.5rem)]">
          idea <span className="text-sulfur">→</span> production
        </h2>
      </div>

      <svg viewBox="0 0 1280 400" className="w-full" fill="none">
        {PATHS.map((d, i) => (
          <path key={i} d={d} className="pf-path" stroke="#5ef6ff" strokeWidth={2} strokeLinejoin="round" opacity={0.9} />
        ))}
        {[
          [180, 120], [420, 120], [700, 120], [980, 120],
          [520, 220], [840, 220], [300, 320], [640, 320], [940, 320],
        ].map(([x, y], i) => (
          <circle key={i} className="pf-node" cx={x} cy={y} r={6} fill="#05070d" stroke="#5ef6ff" strokeWidth={2} />
        ))}
      </svg>

      <div className="grid gap-8 md:grid-cols-3">
        {STEPS.map(([n, t, d]) => (
          <div key={n} className="border-t border-sulfur/30 pt-5">
            <p className="font-mono text-sm text-sulfur">{n}</p>
            <p className="mt-2 font-display text-2xl text-bone">{t}</p>
            <p className="mt-2 font-mono text-sm leading-relaxed text-bone/60">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
