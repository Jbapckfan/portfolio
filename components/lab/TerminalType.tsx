"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import EffectLabel from "../EffectLabel";

gsap.registerPlugin(ScrollTrigger);

type Line = { text: string; tone?: "in" | "ok" | "dim" };
const SCRIPT: Line[] = [
  { text: "$ darkroom infer --model lab-7b --motion", tone: "in" },
  { text: "› allocating latent space ............ ok", tone: "ok" },
  { text: "› loading checkpoint lab-7b.safetensors", tone: "dim" },
  { text: "› sampling 50 steps ................. ok", tone: "ok" },
  { text: "› compositing motion fields ......... ok", tone: "ok" },
  { text: "rendered 1280×800 · 2.41s · 0 warnings", tone: "in" },
];

export default function TerminalType() {
  const sec = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<string[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(SCRIPT.map((l) => l.text));
      return;
    }
    let timers: ReturnType<typeof setTimeout>[] = [];
    const st = ScrollTrigger.create({
      trigger: sec.current,
      start: "top 65%",
      onEnter: () => {
        setShown([]);
        let delay = 0;
        SCRIPT.forEach((line, li) => {
          for (let c = 1; c <= line.text.length; c++) {
            delay += 14;
            timers.push(
              setTimeout(() => {
                setShown((prev) => {
                  const next = [...prev];
                  next[li] = line.text.slice(0, c);
                  return next;
                });
              }, delay)
            );
          }
          delay += 220;
        });
      },
      onLeaveBack: () => {
        timers.forEach(clearTimeout);
        timers = [];
        setShown([]);
      },
    });
    return () => {
      timers.forEach(clearTimeout);
      st.kill();
    };
  }, []);

  const toneCls = (t?: Line["tone"]) =>
    t === "ok" ? "text-sulfur" : t === "dim" ? "text-ash" : "text-bone";

  return (
    <section
      ref={sec}
      className="relative flex min-h-screen items-center justify-center bg-ink px-6"
    >
      <EffectLabel index="L05" name="AI Terminal" tech="typewriter · scroll-triggered" />
      <div className="w-full max-w-3xl border border-sulfur/25 bg-ink/90 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-ash/30 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-ash/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-sulfur/70" />
          <span className="ml-3 font-mono text-xs text-ash">darkroom — inference</span>
        </div>
        <pre className="min-h-[16rem] whitespace-pre-wrap p-5 font-mono text-sm leading-relaxed md:text-base">
          {SCRIPT.map((line, i) => (
            <div key={i} className={toneCls(line.tone)}>
              {shown[i] ?? ""}
              {shown[i] && shown[i].length < line.text.length ? (
                <span className="animate-pulse text-sulfur">▋</span>
              ) : null}
            </div>
          ))}
        </pre>
      </div>
    </section>
  );
}
