"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EffectLabel from "../EffectLabel";

gsap.registerPlugin(ScrollTrigger);

const LINE = "DESIGN · MOTION · FRACTURE · DARKROOM · ";

export default function VelocityMarquee() {
  const section = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const t1 = gsap.fromTo(
        r1.current,
        { xPercent: 0 },
        { xPercent: -50, repeat: -1, duration: 30, ease: "linear" }
      );
      const t2 = gsap.fromTo(
        r2.current,
        { xPercent: -50 },
        { xPercent: 0, repeat: -1, duration: 30, ease: "linear" }
      );
      // Only run the loop while the marquee is on screen.
      t1.pause();
      t2.pause();
      let resetCall: gsap.core.Tween | null = null;
      ScrollTrigger.create({
        trigger: section.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            t1.play();
            t2.play();
          } else {
            t1.pause();
            t2.pause();
          }
        },
        onUpdate: (self) => {
          const v = self.getVelocity();
          const skew = gsap.utils.clamp(-18, 18, v / -60);
          gsap.to([r1.current, r2.current], {
            skewX: skew,
            duration: 0.3,
            overwrite: "auto",
          });
          const ts = 1 + gsap.utils.clamp(0, 8, Math.abs(v) / 120);
          t1.timeScale(ts);
          t2.timeScale(ts);
          resetCall?.kill();
          resetCall = gsap.delayedCall(0.2, () => {
            gsap.to([r1.current, r2.current], {
              skewX: 0,
              duration: 0.5,
              ease: "power2.out",
            });
            t1.timeScale(1);
            t2.timeScale(1);
          });
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative flex min-h-screen flex-col justify-center gap-2 overflow-hidden bg-ink"
    >
      <EffectLabel index="05" name="Velocity Marquee" tech="scroll velocity · skew" />
      <div
        ref={r1}
        className="whitespace-nowrap font-display leading-none tracking-tightest text-bone text-[clamp(3rem,11vw,10rem)]"
      >
        {LINE.repeat(8)}
      </div>
      <div
        ref={r2}
        className="whitespace-nowrap font-display italic leading-none tracking-tightest text-sulfur text-[clamp(3rem,11vw,10rem)]"
      >
        {LINE.repeat(8)}
      </div>
    </section>
  );
}
