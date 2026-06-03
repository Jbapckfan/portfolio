"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LOCAL, field } from "./data";

gsap.registerPlugin(ScrollTrigger);

/** "On Foot" field photography — CSS-masonry grid, reveal-on-scroll.
 *  Masonry (columns) respects each shot's orientation — no cropping. */
export default function LensFieldGrid() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".field-item", { opacity: 0, y: 60 });
      ScrollTrigger.batch(".field-item", {
        start: "top 92%",
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true,
          }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ink px-6 py-24 md:px-14">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="font-display leading-none tracking-tight text-bone text-[clamp(2rem,6vw,4.5rem)]">
          On Foot
        </h2>
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-sulfur">field · non-drone</span>
      </div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {field.map((s) => (
          <figure
            key={s.file}
            className="field-item group relative mb-4 overflow-hidden break-inside-avoid"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOCAL(s.file)}
              alt={s.title}
              className="w-full transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between bg-gradient-to-t from-ink/80 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="font-display text-xl text-bone">{s.title}</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-sulfur">{s.kind}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
