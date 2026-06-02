"use client";

import { PHOTO, lensProfile } from "./data";

/** Closing contact / booking panel over a quiet frame. */
export default function LensContact() {
  return (
    <section id="contact" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PHOTO(1047, 2000, 1200)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-ink/50" />
      <div className="relative z-10 max-w-3xl">
        <p className="font-sans text-xs uppercase tracking-[0.5em] text-sulfur">commissions · prints · aerial</p>
        <h2 className="mt-6 font-display leading-[0.95] tracking-tight text-bone text-[clamp(2.5rem,9vw,7rem)]">
          Let&apos;s make <span className="italic text-sulfur">something</span>.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <a
            href={`mailto:${lensProfile.email}`}
            className="border border-sulfur bg-sulfur px-9 py-4 font-sans text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-transparent hover:text-sulfur"
          >
            {lensProfile.email}
          </a>
          <a
            href={lensProfile.instagram}
            target="_blank"
            rel="noreferrer"
            className="border border-bone/30 px-9 py-4 font-sans text-xs uppercase tracking-[0.25em] text-bone transition-colors hover:border-bone"
          >
            instagram ↗
          </a>
        </div>
        <p className="mt-8 font-sans text-xs uppercase tracking-[0.3em] text-bone/60">{lensProfile.location}</p>
      </div>
    </section>
  );
}
