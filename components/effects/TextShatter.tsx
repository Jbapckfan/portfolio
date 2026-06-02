"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import EffectLabel from "../EffectLabel";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function TextShatter() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current)
      return;
    const split = new SplitText(ref.current, { type: "chars" });
    const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 35%", scrub: 1 },
        yPercent: () => gsap.utils.random(-260, 260),
        xPercent: () => gsap.utils.random(-60, 60),
        rotate: () => gsap.utils.random(-120, 120),
        opacity: 0,
        ease: "power3.out",
        stagger: { amount: 0.4, from: "random" },
      });
    }, ref);
    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6">
      <EffectLabel index="02" name="Text Shatter" tech="GSAP SplitText · scrub" />
      <h2
        ref={ref}
        className="text-center font-display leading-[0.85] tracking-tightest text-bone text-[clamp(3rem,15vw,14rem)]"
      >
        FRACTURE
        <br />
        <span className="italic text-sulfur">the words</span>
      </h2>
    </section>
  );
}
