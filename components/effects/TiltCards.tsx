"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import EffectLabel from "../EffectLabel";
import { IMG } from "./images";

function TiltCard({ id, label }: { id: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(el, {
      rotateY: (px - 0.5) * 22,
      rotateX: -(py - 0.5) * 22,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(glare.current, {
      opacity: 0.55,
      xPercent: px * 60 - 30,
      yPercent: py * 60 - 30,
      duration: 0.4,
    });
  };
  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(glare.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative aspect-[3/4] w-full overflow-hidden will-change-transform [transform-style:preserve-3d]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG(id, 800, 1000)} alt="" className="h-full w-full object-cover" />
      <div
        ref={glare}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(214,255,63,0.55), transparent 55%)",
        }}
      />
      <span className="absolute bottom-4 left-4 font-mono text-xs text-bone mix-blend-difference">
        {label}
      </span>
    </div>
  );
}

export default function TiltCards() {
  const cards: [number, string][] = [
    [1062, "north"],
    [1069, "haze"],
    [1074, "ridge"],
  ];
  return (
    <section className="relative flex min-h-screen items-center bg-ink px-6 py-24 md:px-10">
      <EffectLabel index="06" name="3D Tilt Cards" tech="pointer · perspective · glare" />
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
        {cards.map(([id, l]) => (
          <TiltCard key={id} id={id} label={l} />
        ))}
      </div>
    </section>
  );
}
