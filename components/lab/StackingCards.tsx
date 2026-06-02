"use client";

import EffectLabel from "../EffectLabel";

const CARDS = [
  { id: "lab-7b", role: "base model", params: "7.2B", lat: "41ms", tone: "text-sulfur" },
  { id: "lab-vision", role: "multimodal", params: "13B", lat: "88ms", tone: "text-bone" },
  { id: "lab-motion", role: "diffusion", params: "2.1B", lat: "23ms", tone: "text-signal" },
  { id: "lab-edge", role: "distilled", params: "560M", lat: "6ms", tone: "text-sulfur" },
];

/** Sticky stacking deck — each card pins, the next slides over it. CSS-only. */
export default function StackingCards() {
  return (
    <section className="relative bg-ink">
      <EffectLabel index="L03" name="Stacking Cards" tech="position: sticky · deck stack" />
      {CARDS.map((c, i) => (
        <div
          key={c.id}
          className="sticky flex h-screen items-center justify-center px-6"
          style={{ top: `${6 + i * 3}vh` }}
        >
          <article className="relative flex h-[68vh] w-full max-w-4xl flex-col justify-between overflow-hidden border border-sulfur/25 bg-ink/95 p-8 backdrop-blur md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_-10%,rgba(94,246,255,0.12),transparent_55%)]" />
            <div className="relative flex items-start justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-ash">
                checkpoint {String(i + 1).padStart(2, "0")} / {CARDS.length}
              </span>
              <span className="font-mono text-xs text-sulfur">● online</span>
            </div>
            <h3
              className={`relative font-display font-bold leading-[0.9] tracking-tightest ${c.tone} text-[clamp(2.5rem,9vw,7rem)]`}
            >
              {c.id}
            </h3>
            <div className="relative grid grid-cols-3 gap-6 border-t border-ash/30 pt-6 font-mono">
              <Stat k="role" v={c.role} />
              <Stat k="params" v={c.params} />
              <Stat k="latency" v={c.lat} />
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-ash">{k}</p>
      <p className="mt-1 text-lg text-bone">{v}</p>
    </div>
  );
}
