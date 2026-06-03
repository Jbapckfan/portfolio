"use client";

import { useEffect, useRef } from "react";
import EffectLabel from "../EffectLabel";

/** Gooey metaball cursor — trailing blobs merged via an SVG goo filter. */
export default function GooeyCursor() {
  const sec = useRef<HTMLDivElement>(null);
  const blobs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sec.current!;
    const target = { x: 0, y: 0 };
    const pts = blobs.current.map(() => ({ x: 0, y: 0 }));
    let raf = 0,
      active = false;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
    };
    const onEnter = () => (active = true);
    const onLeave = () => (active = false);

    const tick = () => {
      let px = target.x,
        py = target.y;
      pts.forEach((p, i) => {
        const ease = 0.35 - i * 0.045;
        p.x += (px - p.x) * ease;
        p.y += (py - p.y) * ease;
        const el = blobs.current[i];
        if (el) {
          const s = 1 - i * 0.13;
          el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-50%) scale(${
            active ? s : 0
          })`;
        }
        px = p.x;
        py = p.y;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sec}
      className="relative flex min-h-screen cursor-none items-center justify-center overflow-hidden bg-ink"
    >
      <EffectLabel index="L06" name="Gooey Cursor" tech="metaballs · SVG goo filter" />
      <p className="pointer-events-none relative z-10 text-center font-display font-bold leading-[0.9] tracking-tightest text-bone text-[clamp(2.5rem,9vw,8rem)] mix-blend-difference">
        move
        <br />
        <span className="text-sulfur">inside</span>
      </p>

      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ filter: "url(#goo)" }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              blobs.current[i] = el;
            }}
            className="absolute left-0 top-0 h-16 w-16 rounded-full bg-sulfur will-change-transform"
            style={{ transform: "scale(0)" }}
          />
        ))}
      </div>
    </section>
  );
}
