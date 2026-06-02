"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PHOTO, heroShot, lensProfile } from "./data";

/** Full-bleed hero with a slow Ken Burns drift + title overlay. */
export default function LensHero() {
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { scale: 1.12, xPercent: -2 },
        { scale: 1, xPercent: 2, duration: 18, ease: "none", repeat: -1, yoyo: true }
      );
      gsap.from(".lh-line", { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", delay: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={PHOTO(heroShot.id, 2000, 1200)}
        alt={heroShot.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/80" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-14">
        <div className="flex items-center justify-between font-sans text-xs uppercase tracking-[0.35em] text-bone/80">
          <span>{lensProfile.name}</span>
          <span>{new Date().getFullYear()}</span>
        </div>
        <div>
          <h1 className="font-display leading-[0.95] tracking-tight text-bone text-[clamp(3rem,11vw,10rem)]">
            <span className="lh-line block overflow-hidden">Aerial</span>
            <span className="lh-line block overflow-hidden italic text-sulfur">&amp; Field</span>
          </h1>
          <p className="mt-6 max-w-md font-sans text-base text-bone/85 md:text-lg">
            {lensProfile.tagline}
          </p>
        </div>
        <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-bone/60">
          scroll to explore
        </div>
      </div>
    </section>
  );
}
