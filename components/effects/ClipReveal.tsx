"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EffectLabel from "../EffectLabel";
import { IMG } from "./images";

gsap.registerPlugin(ScrollTrigger);

export default function ClipReveal() {
  const section = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { clipPath: "inset(45% 45% 45% 45%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 py-24"
    >
      <EffectLabel index="09" name="Clip Wipe Reveal" tech="clip-path · scrub" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={IMG(1059, 1600, 1000)}
        alt=""
        className="h-[70vh] w-full max-w-5xl object-cover"
      />
    </section>
  );
}
