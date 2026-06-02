"use client";

import { lensProfile } from "./data";

/** Quiet statement / about — lots of negative space, gallery feel. */
export default function LensIntro() {
  return (
    <section className="relative flex min-h-[80vh] items-center bg-ink px-6 md:px-14">
      <div className="max-w-4xl">
        <p className="font-sans text-xs uppercase tracking-[0.4em] text-sulfur">{lensProfile.craft}</p>
        <p className="mt-8 font-display leading-[1.1] tracking-tight text-bone text-[clamp(1.6rem,4.5vw,3.5rem)]">
          {lensProfile.bio}
        </p>
      </div>
    </section>
  );
}
