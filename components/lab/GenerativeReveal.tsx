"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EffectLabel from "../EffectLabel";
import { IMG } from "../effects/images";

gsap.registerPlugin(ScrollTrigger);

const COLS = 16;
const ROWS = 10;

/** Cells dissolve in random order as you scroll — an image "generating". */
export default function GenerativeReveal() {
  const sec = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray<HTMLElement>(".gen-cell");
      gsap.to(cells, {
        opacity: 0,
        ease: "none",
        stagger: { amount: 1, from: "random" },
        scrollTrigger: {
          trigger: sec.current,
          start: "top top",
          end: "+=130%",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            if (pct.current)
              pct.current.textContent = String(Math.round(self.progress * 100)).padStart(3, "0");
          },
        },
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="relative h-screen overflow-hidden bg-ink">
      <EffectLabel index="L04" name="Generative Reveal" tech="cell dissolve · pin scrub" />
      <div className="flex h-full items-center justify-center p-6 md:p-16">
        <div className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG(1062, 1600, 1000)} alt="" className="h-full w-full object-cover" />
          {/* dissolving mask */}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${COLS},1fr)`,
              gridTemplateRows: `repeat(${ROWS},1fr)`,
            }}
          >
            {Array.from({ length: COLS * ROWS }).map((_, i) => (
              <div
                key={i}
                className="gen-cell border border-sulfur/10 bg-ink"
              />
            ))}
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-xs text-sulfur mix-blend-difference">
            generating <span ref={pct}>000</span>%
          </div>
        </div>
      </div>
    </section>
  );
}
