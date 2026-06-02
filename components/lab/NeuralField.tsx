"use client";

import { useEffect, useRef } from "react";
import EffectLabel from "../EffectLabel";

/** Cursor-reactive node graph on canvas — the "neural net" hero. */
export default function NeuralField() {
  const sec = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      raf = 0,
      running = true;
    type N = { x: number; y: number; vx: number; vy: number };
    let nodes: N[] = [];
    const mouse = { x: -9999, y: -9999 };
    const COUNT = 72;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () =>
      (nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
      })));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = n.x - mouse.x,
          dy = n.y - mouse.y,
          d = Math.hypot(dx, dy);
        if (d < 150 && d > 0.01) {
          n.x += (dx / d) * 1.4;
          n.y += (dy / d) * 1.4;
        }
      }
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j],
            d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 132) {
            ctx.globalAlpha = (1 - d / 132) * 0.8;
            ctx.strokeStyle = "#5ef6ff";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      ctx.globalAlpha = 1;
      for (const n of nodes) {
        ctx.fillStyle = "#5ef6ff";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, 7);
        ctx.fill();
      }
    };
    const loop = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    init();
    if (reduce) draw();
    else loop();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => ((mouse.x = -9999), (mouse.y = -9999));
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    const io = new IntersectionObserver(([e]) => {
      if (reduce) return;
      if (e.isIntersecting && !running) {
        running = true;
        loop();
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(sec.current!);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sec}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-ink"
    >
      <EffectLabel index="L01" name="Neural Field" tech="canvas · node graph · cursor-reactive" />
      <canvas ref={cv} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 px-6 text-center mix-blend-difference">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-sulfur">
          model://darkroom-lab
        </p>
        <h1 className="mt-5 font-display font-bold leading-[0.88] tracking-tightest text-bone text-[clamp(3rem,12vw,11rem)]">
          SYNTHETIC
          <br />
          MOTION
        </h1>
      </div>
    </section>
  );
}
