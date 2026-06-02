"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EffectLabel from "../EffectLabel";
import { IMG } from "./images";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [1015, 1016, 1018, 1024, 1036, 1039];

export default function HorizontalScroll() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !section.current ||
      !track.current
    )
      return;
    const ctx = gsap.context(() => {
      const t = track.current!;
      gsap.to(t, {
        x: () => -(t.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => "+=" + (t.scrollWidth - window.innerWidth),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative h-screen overflow-hidden bg-ink">
      <EffectLabel index="03" name="Horizontal Scroll" tech="GSAP pin · scrub" />
      <div
        ref={track}
        className="flex h-full items-center gap-6 pl-6 md:gap-10 md:pl-10"
        style={{ width: "max-content" }}
      >
        {PANELS.map((id, i) => (
          <figure
            key={id}
            className="relative h-[60vh] w-[70vw] shrink-0 overflow-hidden md:w-[42vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG(id, 1000, 1200)} alt="" className="h-full w-full object-cover" />
            <figcaption className="absolute bottom-4 left-4 font-mono text-xs text-bone mix-blend-difference">
              {String(i + 1).padStart(2, "0")} / fragment
            </figcaption>
          </figure>
        ))}
        <div className="flex h-[60vh] w-[70vw] shrink-0 items-center md:w-[42vw]">
          <p className="font-display leading-[0.95] tracking-tightest text-bone text-[clamp(2.5rem,7vw,6rem)]">
            Keep
            <br />
            <span className="italic text-sulfur">going →</span>
          </p>
        </div>
      </div>
    </section>
  );
}
