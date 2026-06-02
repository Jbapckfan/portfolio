"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Text Shatter — a value-prop statement that assembles from fragments. */
export default function Manifesto() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current)
      return;
    const split = new SplitText(ref.current, { type: "chars" });
    const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        scrollTrigger: { trigger: ref.current, start: "top 80%", end: "top 35%", scrub: 1 },
        yPercent: () => gsap.utils.random(-220, 220),
        xPercent: () => gsap.utils.random(-50, 50),
        rotate: () => gsap.utils.random(-100, 100),
        opacity: 0,
        ease: "power3.out",
        stagger: { amount: 0.35, from: "random" },
      });
    }, ref);
    return () => { ctx.revert(); split.revert(); };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center bg-ink px-6 md:px-16">
      <h2
        ref={ref}
        className="font-display font-bold leading-[0.9] tracking-tightest text-[clamp(2.5rem,9vw,8rem)]"
      >
        <span className="block text-bone">Clinical problems,</span>
        <span className="block text-sulfur">shipped software.</span>
      </h2>
    </section>
  );
}
