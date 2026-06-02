"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import EffectLabel from "../EffectLabel";

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power3.out" });
    gsap.to(label.current, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power3.out" });
  };
  const leave = () => {
    gsap.to([ref.current, label.current], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1,0.3)",
    });
  };

  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className="relative border border-sulfur/40 px-10 py-6 transition-colors hover:border-sulfur"
    >
      <span
        ref={label}
        className="block font-mono text-sm uppercase tracking-[0.25em] text-bone"
      >
        {children}
      </span>
    </button>
  );
}

export default function Magnetic() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-12 bg-ink px-6">
      <EffectLabel index="07" name="Magnetic Field" tech="pointer attraction · elastic" />
      <p className="text-center font-display leading-[0.95] tracking-tightest text-bone text-[clamp(2.5rem,8vw,7rem)]">
        Pull me <span className="italic text-sulfur">closer</span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <MagneticButton>Explore</MagneticButton>
        <MagneticButton>Get in touch</MagneticButton>
      </div>
    </section>
  );
}
