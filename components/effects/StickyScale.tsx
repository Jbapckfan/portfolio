"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EffectLabel from "../EffectLabel";
import { IMG } from "./images";

gsap.registerPlugin(ScrollTrigger);

export default function StickyScale() {
  const section = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const cap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=140%",
          scrub: 1,
          pin: true,
        },
      });
      tl.fromTo(
        box.current,
        { scale: 0.3, borderRadius: "24px" },
        { scale: 1, borderRadius: "0px", ease: "power2.inOut" }
      ).fromTo(
        cap.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out" },
        0.4
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative h-screen overflow-hidden bg-ink">
      <EffectLabel index="04" name="Sticky Scale" tech="GSAP pin · scale-to-fill" />
      <div className="flex h-full items-center justify-center">
        <div ref={box} className="relative h-screen w-screen overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG(1047, 1920, 1080)} alt="" className="h-full w-full object-cover" />
          <div ref={cap} className="absolute inset-0 flex items-end p-10">
            <p className="font-display leading-[0.95] tracking-tightest text-bone text-[clamp(2.5rem,8vw,7rem)] mix-blend-difference">
              Fills the
              <br />
              <span className="italic text-sulfur">whole frame</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
