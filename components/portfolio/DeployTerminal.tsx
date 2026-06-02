"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Line = { text: string; tone?: "in" | "ok" | "dim" };
const SCRIPT: Line[] = [
  { text: "$ darkroom deploy --all", tone: "in" },
  { text: "› ed-scheduling ............. building → live", tone: "ok" },
  { text: "› ed-intake-ai ............. building → live", tone: "ok" },
  { text: "› medcred → testflight ..... ok", tone: "ok" },
  { text: "› pricewatch · command-center · tars ... ok", tone: "dim" },
  { text: "6 projects live · 0 incidents · ready to ship yours", tone: "in" },
];

/** AI Terminal — a deploy log that types itself out on scroll. */
export default function DeployTerminal() {
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
            delay += 13;
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
          delay += 200;
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

  const tone = (t?: Line["tone"]) =>
    t === "ok" ? "text-sulfur" : t === "dim" ? "text-ash" : "text-bone";

  return (
    <section ref={sec} className="relative flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-3xl border border-sulfur/25 bg-ink/90 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-ash/30 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-ash/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-sulfur/70" />
          <span className="ml-3 font-mono text-xs text-ash">darkroom — deploy</span>
        </div>
        <pre className="min-h-[15rem] whitespace-pre-wrap p-5 font-mono text-sm leading-relaxed md:text-base">
          {SCRIPT.map((line, i) => (
            <div key={i} className={tone(line.tone)}>
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
