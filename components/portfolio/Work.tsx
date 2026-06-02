"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { projects, type Project } from "./data";

gsap.registerPlugin(Draggable, InertiaPlugin);

const CAT_TONE: Record<Project["category"], string> = {
  "AI App": "text-sulfur",
  SaaS: "text-signal",
  Website: "text-bone",
  iOS: "text-sulfur",
  Tool: "text-bone",
};

/** Draggable Gallery — throwable strip of project cards. */
export default function Work() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !track.current)
      return;
    const t = track.current;
    const make = () => {
      const max = t.scrollWidth - window.innerWidth + 64;
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
    <section id="work" className="relative flex min-h-screen flex-col justify-center gap-10 overflow-hidden bg-ink py-24">
      <div className="flex items-end justify-between px-6 md:px-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-ash">selected work</p>
          <h2 className="mt-3 font-display font-bold leading-none tracking-tightest text-bone text-[clamp(2rem,7vw,5rem)]">
            Things I&apos;ve shipped
          </h2>
        </div>
        <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-sulfur md:block">
          drag · throw →
        </span>
      </div>

      <div ref={track} className="flex w-max cursor-grab items-stretch gap-6 px-6 active:cursor-grabbing md:px-16">
        {projects.map((p, i) => (
          <article
            key={p.name}
            className="relative flex h-[58vh] w-[78vw] shrink-0 select-none flex-col justify-between overflow-hidden border border-sulfur/20 bg-ink/80 p-7 md:w-[30vw] md:p-9"
          >
            <div className="absolute inset-0 -z-0 opacity-50 bg-[radial-gradient(circle_at_70%_-10%,rgba(94,246,255,0.12),transparent_55%)]" />
            <div className="relative flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em]">
              <span className={CAT_TONE[p.category]}>{p.category}</span>
              <span className="text-ash">
                {String(i + 1).padStart(2, "0")} / {projects.length}
              </span>
            </div>
            <h3 className="relative font-display font-bold leading-[0.92] tracking-tightest text-bone text-[clamp(2rem,4vw,3.5rem)]">
              {p.name}
            </h3>
            <p className="relative font-mono text-sm leading-relaxed text-bone/70">{p.blurb}</p>
            <div className="relative flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
              {p.status && <span className="text-sulfur">● {p.status}</span>}
              {p.tags.map((t) => (
                <span key={t} className="border border-ash/40 px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
