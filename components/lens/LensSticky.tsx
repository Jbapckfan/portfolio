"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHOTO, stickyShot } from "./data";

gsap.registerPlugin(ScrollTrigger);

/** Sticky Scale — a frame opens from a centered card to full-bleed. */
export default function LensSticky() {
  const sec = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const cap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: sec.current, start: "top top", end: "+=140%", scrub: 1, pin: true },
        })
        .fromTo(box.current, { scale: 0.5, borderRadius: "16px" }, { scale: 1, borderRadius: "0px", ease: "power2.inOut" })
        .fromTo(cap.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.5);
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="relative h-screen overflow-hidden bg-ink">
      <div className="flex h-full items-center justify-center">
        <div ref={box} className="relative h-screen w-screen overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO(stickyShot.id, 2000, 1200)} alt={stickyShot.title} className="h-full w-full object-cover" />
          <div ref={cap} className="absolute inset-0 flex items-end p-6 md:p-14">
            <div className="mix-blend-difference">
              <h2 className="font-display italic leading-none tracking-tight text-bone text-[clamp(2.5rem,9vw,7rem)]">
                {stickyShot.title}
              </h2>
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-bone/85">
                {stickyShot.kind} · golden hour
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
