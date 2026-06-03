"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import EffectLabel from "../EffectLabel";
import { IMG } from "../effects/images";

gsap.registerPlugin(Draggable, InertiaPlugin);

const ITEMS = [
  [1015, "fjord-01"],
  [1016, "ridge-02"],
  [1018, "delta-03"],
  [1024, "vapor-04"],
  [1036, "strata-05"],
  [1039, "basin-06"],
  [1047, "crest-07"],
] as const;

/** Throwable horizontal gallery — GSAP Draggable + Inertia (momentum flick). */
export default function DraggableGallery() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !track.current)
      return;
    const t = track.current;
    const update = () => {
      const max = t.scrollWidth - window.innerWidth + 64;
      return Draggable.create(t, {
        type: "x",
        inertia: true,
        edgeResistance: 0.85,
        bounds: { minX: -Math.max(max, 0), maxX: 0 },
        cursor: "grab",
        activeCursor: "grabbing",
      });
    };
    const instances = update();
    window.addEventListener("resize", update);
    return () => {
      instances.forEach((d) => d.kill());
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-center gap-10 overflow-hidden bg-ink">
      <EffectLabel index="L04" name="Draggable Gallery" tech="GSAP Draggable · inertia flick" />
      <div className="px-6 md:px-16">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-sulfur">
          drag · throw →
        </p>
      </div>
      <div
        ref={track}
        className="flex w-max cursor-grab items-center gap-6 px-6 active:cursor-grabbing md:px-16"
      >
        {ITEMS.map(([id, name]) => (
          <figure
            key={id}
            className="relative h-[52vh] w-[68vw] shrink-0 select-none overflow-hidden border border-sulfur/20 md:w-[30vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG(id, 900, 1100)}
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute bottom-3 left-3 font-mono text-xs text-sulfur mix-blend-difference">
              {name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
