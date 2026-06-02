"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "./data";

gsap.registerPlugin(ScrollTrigger);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*<>/\\";
function decrypt(el: HTMLElement, text: string, dur = 900) {
  const start = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const shown = Math.floor(p * text.length);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") out += " ";
      else if (i < shown) out += text[i];
      else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = text;
  };
  requestAnimationFrame(step);
}

/** Decrypt Text heading + a real bio paragraph. */
export default function About() {
  const sec = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = head.current!;
    const text = target.dataset.text || "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.textContent = text;
      return;
    }
    const st = ScrollTrigger.create({
      trigger: sec.current,
      start: "top 65%",
      onEnter: () => decrypt(target, text, 1000),
      onLeaveBack: () => (target.textContent = ""),
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={sec} className="relative flex min-h-screen items-center bg-ink px-6 md:px-16">
      <div className="grid w-full max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-ash">about</p>
          <h2 className="mt-4 font-mono font-medium leading-[1.05] text-sulfur text-[clamp(2rem,6vw,4.5rem)]">
            <span ref={head} data-text={`WHO // ${profile.name.toUpperCase()}`} />
          </h2>
        </div>
        <p className="font-mono text-lg leading-relaxed text-bone/85 md:text-2xl">
          {profile.bio}
        </p>
      </div>
    </section>
  );
}
