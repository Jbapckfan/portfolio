"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { LOCAL, gallery } from "./data";

gsap.registerPlugin(Draggable, InertiaPlugin);

/** Draggable, throwable color gallery. */
export default function LensGallery() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !track.current) return;
    const t = track.current;
    const make = () => {
      const max = t.scrollWidth - window.innerWidth + 56;
      return Draggable.create(t, {
        type: "x",
        inertia: true,
        edgeResistance: 0.85,
        bounds: { minX: -Math.max(max, 0), maxX: 0 },
        cursor: "grab",
        activeCursor: "grabbing",
      });
    };
    const instances = make();
    window.addEventListener("resize", make);
    return () => {
      instances.forEach((d) => d.kill());
      window.removeEventListener("resize", make);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-center gap-8 overflow-hidden bg-ink py-20">
      <div className="flex items-end justify-between px-6 md:px-14">
        <h2 className="font-display leading-none tracking-tight text-bone text-[clamp(2rem,6vw,4.5rem)]">Selected frames</h2>
        <span className="hidden font-sans text-xs uppercase tracking-[0.3em] text-sulfur md:block">drag · throw →</span>
      </div>
      <div ref={track} className="flex w-max cursor-grab items-center gap-5 px-6 active:cursor-grabbing md:px-14">
        {gallery.map((s) => (
          <figure key={s.file} className="relative h-[58vh] w-[80vw] shrink-0 select-none overflow-hidden md:w-[34vw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOCAL(s.file)} alt={s.title} draggable={false} className="h-full w-full object-cover" />
            <figcaption className="absolute bottom-4 left-4 flex items-baseline gap-3 mix-blend-difference">
              <span className="font-display text-2xl text-bone">{s.title}</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/80">{s.kind}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
