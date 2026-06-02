"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { feature } from "./data";

gsap.registerPlugin(ScrollTrigger);

/** Clip Wipe Reveal — a second featured project opens from its center. */
export default function FeatureReveal() {
  const sec = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.current,
        { clipPath: "inset(46% 46% 46% 46%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          scrollTrigger: { trigger: sec.current, start: "top 80%", end: "top 25%", scrub: 1 },
        }
      );
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="relative flex min-h-screen flex-col justify-center gap-10 bg-ink px-6 py-24 md:px-16">
      <div className="flex items-end justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-ash">featured · {feature.category}</p>
        <span className="font-mono text-xs text-sulfur">{feature.year}</span>
      </div>

      <div ref={panel} className="relative h-[62vh] w-full overflow-hidden border border-sulfur/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,61,110,0.16),transparent_55%),radial-gradient(circle_at_90%_80%,rgba(94,246,255,0.16),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(94,246,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(94,246,255,0.08) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
          <h2 className="max-w-3xl font-display font-bold leading-[0.9] tracking-tightest text-bone text-[clamp(2.5rem,8vw,7rem)]">
            {feature.name}
          </h2>
          <p className="mt-5 max-w-xl font-mono text-base text-bone/80 md:text-lg">{feature.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ash">
            {feature.tags.map((t) => (
              <span key={t} className="border border-ash/40 px-3 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
