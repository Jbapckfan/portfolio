"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { profile } from "./data";

gsap.registerPlugin(Physics2DPlugin);

const COLORS = ["#5ef6ff", "#ff3d6e", "#e9eef7"];

/** Contact — gooey-cursor section + a Physics2D particle-burst CTA. */
export default function Contact() {
  const sec = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const blobs = useRef<(HTMLSpanElement | null)[]>([]);

  // Gooey metaball cursor (scoped to this section).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sec.current!;
    const target = { x: 0, y: 0 };
    const pts = blobs.current.map(() => ({ x: 0, y: 0 }));
    let raf = 0, active = false;
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
    };
    const onEnter = () => (active = true);
    const onLeave = () => (active = false);
    const tick = () => {
      let px = target.x, py = target.y;
      pts.forEach((p, i) => {
        const ease = 0.35 - i * 0.05;
        p.x += (px - p.x) * ease;
        p.y += (py - p.y) * ease;
        const el = blobs.current[i];
        if (el) el.style.transform = `translate(${p.x}px,${p.y}px) translate(-50%,-50%) scale(${active ? 1 - i * 0.14 : 0})`;
        px = p.x; py = p.y;
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

  const burst = (e: React.MouseEvent) => {
    const h = host.current;
    if (!h) return;
    const r = h.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("span");
      const size = gsap.utils.random(6, 13);
      p.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:9999px;background:${COLORS[i % 3]};pointer-events:none;will-change:transform;`;
      h.appendChild(p);
      gsap.to(p, {
        duration: gsap.utils.random(0.9, 1.6),
        physics2D: {
          velocity: gsap.utils.random(380, 780),
          angle: gsap.utils.random(0, 360),
          gravity: 900,
        },
        opacity: 0,
        scale: gsap.utils.random(0.3, 1.2),
        ease: "power2.out",
        onComplete: () => p.remove(),
      });
    }
  };

  return (
    <section
      id="contact"
      ref={sec}
      className="relative flex min-h-screen cursor-none flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center"
    >
      {/* particle host */}
      <div ref={host} className="pointer-events-none absolute inset-0 z-20" />

      {/* gooey cursor */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="goo-contact">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "url(#goo-contact)" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              blobs.current[i] = el;
            }}
            className="absolute left-0 top-0 block h-14 w-14 rounded-full bg-sulfur/70"
            style={{ transform: "scale(0)" }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-sulfur">contact</p>
        <h2 className="mt-5 font-display font-bold leading-[0.9] tracking-tightest text-bone text-[clamp(2.5rem,10vw,8rem)]">
          Let&apos;s build
          <br />
          <span className="text-sulfur">something.</span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <button
            onClick={burst}
            className="cursor-pointer border border-sulfur bg-sulfur px-9 py-4 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-transparent hover:text-sulfur"
          >
            ✦ click to celebrate
          </button>
          <a
            href={`mailto:${profile.email}`}
            className="cursor-pointer border border-sulfur/40 px-9 py-4 font-mono text-xs uppercase tracking-[0.25em] text-sulfur transition-colors hover:border-sulfur"
          >
            {profile.email}
          </a>
        </div>
        <div className="mt-8 flex items-center justify-center gap-6 font-mono text-xs uppercase tracking-[0.3em] text-ash">
          <a href={profile.github} target="_blank" rel="noreferrer" className="cursor-pointer hover:text-sulfur">
            github ↗
          </a>
          <span>·</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </section>
  );
}
