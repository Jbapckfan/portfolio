"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHOTO, grid } from "./data";

gsap.registerPlugin(ScrollTrigger);

/** Archive grid — frames fade/rise in as they enter view (ScrollTrigger.batch). */
export default function LensGrid() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set(".grid-item", { opacity: 0, y: 60 });
      ScrollTrigger.batch(".grid-item", {
        start: "top 90%",
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", overwrite: true }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ink px-6 py-24 md:px-14">
      <h2 className="mb-12 font-display leading-none tracking-tight text-bone text-[clamp(2rem,6vw,4.5rem)]">Archive</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((s, i) => (
          <figure
            key={s.id}
            className={`grid-item group relative overflow-hidden ${i % 5 === 0 ? "sm:col-span-2" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO(s.id, 1200, i % 5 === 0 ? 700 : 900)}
              alt={s.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between bg-gradient-to-t from-ink/80 to-transparent p-4">
              <span className="font-display text-xl text-bone">{s.title}</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-sulfur">{s.kind}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
