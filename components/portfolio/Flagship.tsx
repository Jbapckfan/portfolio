"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flagship } from "./data";

gsap.registerPlugin(ScrollTrigger);

/** Sticky Scale — the flagship project panel scales up to fill the frame. */
export default function Flagship() {
  const sec = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const cap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sec.current,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            pin: true,
          },
        })
        .fromTo(
          box.current,
          { scale: 0.32, borderRadius: "20px" },
          { scale: 1, borderRadius: "0px", ease: "power2.inOut" }
        )
        .fromTo(cap.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.45);
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="relative h-screen overflow-hidden bg-ink">
      <div className="flex h-full items-center justify-center">
        <div
          ref={box}
          className="relative h-screen w-screen overflow-hidden border border-sulfur/20"
        >
          {/* designed project visual (swap for a real screenshot anytime) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(94,246,255,0.18),transparent_55%),radial-gradient(circle_at_85%_90%,rgba(255,61,110,0.12),transparent_50%)]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(94,246,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(94,246,255,0.08) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div ref={cap} className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-sulfur">
              <span>flagship · {flagship.category}</span>
              <span>{flagship.year}</span>
            </div>
            <div className="max-w-3xl">
              <h2 className="font-display font-bold leading-[0.88] tracking-tightest text-bone text-[clamp(3rem,11vw,9rem)]">
                {flagship.name}
              </h2>
              <p className="mt-6 max-w-xl font-mono text-base text-bone/80 md:text-xl">
                {flagship.blurb}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ash">
                {flagship.tags.map((t) => (
                  <span key={t} className="border border-ash/40 px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
