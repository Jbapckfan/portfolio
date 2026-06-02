"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

const COLS = 8;
const ROWS = 5;
const TILE_COUNT = COLS * ROWS;
// Pinned image source. background-position math slices one image across tiles.
// Grayscale on purpose — pairs with the sulfur accent, stays off-brand from
// the no-purple rule.
const IMAGE = "https://picsum.photos/id/1015/1600/1000?grayscale";

/** Deterministic pseudo-random so SSR and client agree (no Math.random in render). */
function rand(seed: number) {
  const x = Math.sin(seed * 99.123) * 43758.5453;
  return x - Math.floor(x);
}

export default function ExplodedHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [exploded, setExploded] = useState(false);

  // Scroll-driven explode (the headline effect).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !sectionRef.current) return;

    const tiles = tilesRef.current.filter(Boolean) as HTMLDivElement[];
    const ctx = gsap.context(() => {
      // Intro: headline reveals on load (NOT scrubbed) — hierarchy first.
      gsap.from(".hero-line", {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });

      // Scrubbed timeline drives only the explode — headline stays put at top.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=160%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Tiles fly outward radially from the grid center, with rotation + blur.
      tiles.forEach((tile, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const dx = (col + 0.5) / COLS - 0.5; // -0.5..0.5
        const dy = (row + 0.5) / ROWS - 0.5;
        const dist = 280 + rand(i) * 520;
        tl.to(
          tile,
          {
            xPercent: dx * dist,
            yPercent: dy * dist,
            rotate: (rand(i + 7) - 0.5) * 90,
            scale: 0.55 + rand(i + 3) * 0.35,
            filter: "blur(2px)",
            ease: "power2.in",
          },
          0 // all tiles start exploding together
        );
      });
      // Headline is intentionally left out of the scrub timeline — animating
      // the same .hero-line in two tweens makes GSAP overwrite one. The intro
      // owns the headline; the scrub owns the tiles. Clean separation.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Manual Flip toggle — snaps the whole thing apart / back independent of scroll.
  const toggleExplode = () => {
    const tiles = tilesRef.current.filter(Boolean) as HTMLDivElement[];
    const state = Flip.getState(tiles);
    const next = !exploded;
    setExploded(next);

    tiles.forEach((tile, i) => {
      if (next) {
        const ang = rand(i) * Math.PI * 2;
        const r = 120 + rand(i + 5) * 320;
        gsap.set(tile, {
          x: Math.cos(ang) * r,
          y: Math.sin(ang) * r,
          rotate: (rand(i + 2) - 0.5) * 160,
          scale: 0.5 + rand(i + 9) * 0.4,
        });
      } else {
        gsap.set(tile, { x: 0, y: 0, rotate: 0, scale: 1 });
      }
    });

    Flip.from(state, {
      duration: 0.9,
      ease: "power3.inOut",
      stagger: { amount: 0.25, from: "center" },
    });
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Tile grid — collectively forms one image */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: TILE_COUNT }).map((_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          return (
            <div
              key={i}
              ref={(el) => {
                tilesRef.current[i] = el;
              }}
              className="relative will-change-transform"
              style={{
                backgroundImage: `url(${IMAGE})`,
                backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                backgroundPosition: `${(col / (COLS - 1)) * 100}% ${
                  (row / (ROWS - 1)) * 100
                }%`,
                outline: "0.5px solid rgba(214,255,63,0.12)", // sulfur grid lines
              }}
            />
          );
        })}
      </div>

      {/* Ink scrim for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/80" />

      {/* Headline */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-14">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-ash">
          <span>Darkroom / 001</span>
          <span>Scroll to fracture</span>
        </div>

        <div className="max-w-4xl">
          <h1 className="font-display text-bone leading-[0.92] tracking-tightest text-[clamp(3.5rem,12vw,11rem)]">
            <span className="hero-line block overflow-hidden">Break it</span>
            <span className="hero-line block overflow-hidden">
              into <span className="text-sulfur italic">pieces.</span>
            </span>
          </h1>
        </div>

        <div className="flex items-end justify-between">
          <p className="max-w-xs text-sm leading-relaxed text-bone/70">
            One image, forty fragments. Driven by Lenis-smoothed scroll and
            GSAP ScrollTrigger.
          </p>
          <button
            onClick={toggleExplode}
            className="group relative border border-sulfur/40 bg-ink/40 px-6 py-3 text-xs uppercase tracking-[0.25em] text-sulfur backdrop-blur transition-colors hover:bg-sulfur hover:text-ink"
          >
            {exploded ? "Reassemble" : "Explode"} ↗
          </button>
        </div>
      </div>
    </section>
  );
}
