"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import EffectLabel from "../EffectLabel";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const PATHS = [
  "M0 120 H180 L230 70 H420 L470 120 H700 L760 60 H980 L1040 120 H1280",
  "M0 220 H120 L180 160 H520 L560 220 H840 L900 280 H1280",
  "M0 320 H300 L360 260 H640 L700 320 H940 L1000 380 H1280",
];

/** SVG circuit traces draw themselves on scroll (real DrawSVGPlugin). */
export default function CircuitDraw() {
  const sec = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".circuit-path",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sec.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        ".circuit-node",
        { scale: 0, transformOrigin: "center" },
        {
          scale: 1,
          ease: "back.out(2)",
          stagger: 0.05,
          scrollTrigger: { trigger: sec.current, start: "top 55%", end: "bottom 60%", scrub: 1 },
        }
      );
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sec}
      className="relative flex min-h-screen flex-col justify-center gap-10 bg-ink px-6 py-24 md:px-16"
    >
      <EffectLabel index="L03" name="Circuit Draw" tech="GSAP DrawSVG · scrub" />
      <p className="font-display font-bold leading-[0.9] tracking-tightest text-bone text-[clamp(2rem,7vw,5.5rem)]">
        signal <span className="text-sulfur">routing</span>
      </p>
      <svg viewBox="0 0 1280 400" className="w-full" fill="none">
        {PATHS.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              className="circuit-path"
              stroke="#5ef6ff"
              strokeWidth={2}
              strokeLinejoin="round"
              opacity={0.9}
            />
          </g>
        ))}
        {[
          [180, 120],
          [420, 120],
          [700, 120],
          [980, 120],
          [520, 220],
          [840, 220],
          [300, 320],
          [640, 320],
          [940, 320],
        ].map(([x, y], i) => (
          <circle
            key={i}
            className="circuit-node"
            cx={x}
            cy={y}
            r={6}
            fill="#05070d"
            stroke="#5ef6ff"
            strokeWidth={2}
          />
        ))}
      </svg>
    </section>
  );
}
