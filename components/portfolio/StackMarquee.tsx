"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stack } from "./data";

gsap.registerPlugin(ScrollTrigger);

/** Velocity Marquee — the tech stack, skewing with scroll speed. */
export default function StackMarquee() {
  const sec = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const t1 = gsap.fromTo(r1.current, { xPercent: 0 }, { xPercent: -50, repeat: -1, duration: 28, ease: "linear" });
      const t2 = gsap.fromTo(r2.current, { xPercent: -50 }, { xPercent: 0, repeat: -1, duration: 28, ease: "linear" });
      t1.pause(); t2.pause();
      let reset: gsap.core.Tween | null = null;
      ScrollTrigger.create({
        trigger: sec.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) { t1.play(); t2.play(); } else { t1.pause(); t2.pause(); }
        },
        onUpdate: (self) => {
          const v = self.getVelocity();
          gsap.to([r1.current, r2.current], { skewX: gsap.utils.clamp(-16, 16, v / -60), duration: 0.3, overwrite: "auto" });
          const ts = 1 + gsap.utils.clamp(0, 7, Math.abs(v) / 130);
          t1.timeScale(ts); t2.timeScale(ts);
          reset?.kill();
          reset = gsap.delayedCall(0.2, () => {
            gsap.to([r1.current, r2.current], { skewX: 0, duration: 0.5, ease: "power2.out" });
            t1.timeScale(1); t2.timeScale(1);
          });
        },
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  const line = stack.join("  ·  ") + "  ·  ";
  return (
    <section ref={sec} className="relative flex min-h-[70vh] flex-col justify-center gap-2 overflow-hidden border-y border-ash/20 bg-ink">
      <p className="px-6 font-mono text-xs uppercase tracking-[0.4em] text-ash md:px-16">stack</p>
      <div ref={r1} className="whitespace-nowrap font-display font-bold leading-none tracking-tightest text-bone text-[clamp(2.5rem,9vw,8rem)]">
        {line.repeat(6)}
      </div>
      <div ref={r2} className="whitespace-nowrap font-display font-bold leading-none tracking-tightest text-sulfur text-[clamp(2.5rem,9vw,8rem)]">
        {line.repeat(6)}
      </div>
    </section>
  );
}
