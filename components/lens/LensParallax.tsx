"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHOTO, bands } from "./data";

gsap.registerPlugin(ScrollTrigger);

/** Parallax bands — full-bleed frames whose imagery drifts as you scroll. */
export default function LensParallax() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".band-img").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -14 },
          {
            yPercent: 14,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1 },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-ink">
      {bands.map((s) => (
        <figure key={s.id} className="relative h-[80vh] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTO(s.id, 2000, 1300)}
            alt={s.title}
            className="band-img absolute inset-x-0 top-[-14%] h-[128%] w-full object-cover"
          />
          <figcaption className="absolute bottom-6 left-6 flex items-baseline gap-4 md:left-14">
            <span className="font-display text-3xl text-bone md:text-5xl mix-blend-difference">{s.title}</span>
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-bone/80 mix-blend-difference">{s.kind}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
