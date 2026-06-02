"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EffectLabel from "../EffectLabel";

gsap.registerPlugin(ScrollTrigger);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*<>/\\{}[]";

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

export default function DecryptText() {
  const sec = useRef<HTMLDivElement>(null);
  const lines = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lines.current.forEach((l) => l && (l.textContent = l.dataset.text || ""));
      return;
    }
    const st = ScrollTrigger.create({
      trigger: sec.current,
      start: "top 60%",
      onEnter: () =>
        lines.current.forEach((t, i) => {
          if (t)
            setTimeout(() => decrypt(t, t.dataset.text || "", 800 + i * 200), i * 160);
        }),
      onLeaveBack: () => lines.current.forEach((t) => t && (t.textContent = "")),
    });
    return () => st.kill();
  }, []);

  const TEXT = ["DECODING", "THE SIGNAL", "FROM NOISE"];
  return (
    <section
      ref={sec}
      className="relative flex min-h-screen items-center bg-ink px-6 md:px-16"
    >
      <EffectLabel index="L02" name="Decrypt Text" tech="char scramble · resolve-on-enter" />
      <h2 className="font-mono font-medium leading-[1.05] tracking-tight text-[clamp(2.2rem,8vw,7rem)]">
        {TEXT.map((s, i) => (
          <span
            key={i}
            ref={(el) => {
              lines.current[i] = el;
            }}
            data-text={s}
            className={i === 1 ? "block text-sulfur" : "block text-bone"}
          />
        ))}
      </h2>
    </section>
  );
}
