"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EffectLabel from "../EffectLabel";
import { IMG } from "./images";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxDepth() {
  const section = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const st = {
        trigger: section.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      } as const;
      gsap.to(".p-bg", { yPercent: 25, ease: "none", scrollTrigger: st });
      gsap.to(".p-mid", { yPercent: -20, ease: "none", scrollTrigger: st });
      gsap.to(".p-fg", { yPercent: -55, ease: "none", scrollTrigger: st });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-ink"
    >
      <EffectLabel index="08" name="Parallax Depth" tech="layered scrub · 3 planes" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG(1057, 1920, 1200)}
        alt=""
        className="p-bg absolute inset-x-0 top-[-15%] h-[130%] w-full object-cover opacity-50"
      />
      <p className="p-mid relative font-display leading-[0.9] tracking-tightest text-bone text-[clamp(3rem,14vw,13rem)] mix-blend-difference">
        DEPTH
      </p>
      <span className="p-fg absolute bottom-20 font-mono text-xs uppercase tracking-[0.4em] text-sulfur">
        three planes · one scroll
      </span>
    </section>
  );
}
