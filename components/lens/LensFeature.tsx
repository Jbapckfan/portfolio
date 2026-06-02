"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LOCAL, featureShot } from "./data";

gsap.registerPlugin(ScrollTrigger);

/** Clip Wipe Reveal on a featured frame. */
export default function LensFeature() {
  const sec = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap.current,
        { clipPath: "inset(0% 50% 0% 50%)" },
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
    <section ref={sec} className="relative flex min-h-screen flex-col justify-center gap-6 bg-ink px-6 py-20 md:px-14">
      <div className="flex items-end justify-between">
        <h2 className="font-display italic leading-none tracking-tight text-bone text-[clamp(2rem,6vw,4.5rem)]">
          {featureShot.title}
        </h2>
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-sulfur">{featureShot.kind}</span>
      </div>
      <div ref={wrap} className="relative h-[64vh] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOCAL(featureShot.file)} alt={featureShot.title} className="h-full w-full object-cover" />
      </div>
    </section>
  );
}
