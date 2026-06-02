"use client";

import { useEffect, useRef } from "react";
import { profile } from "./data";

/** Neural-field canvas hero with the name/role/tagline overlay. */
export default function PortfolioHero() {
  const sec = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, running = true;
    type N = { x: number; y: number; vx: number; vy: number };
    let nodes: N[] = [];
    const mouse = { x: -9999, y: -9999 };
    const COUNT = 80;

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => (nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    })));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 160 && d > 0.01) { n.x += (dx / d) * 1.5; n.y += (dy / d) * 1.5; }
      }
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.globalAlpha = (1 - d / 140) * 0.7;
            ctx.strokeStyle = "#5ef6ff"; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      ctx.globalAlpha = 1;
      for (const n of nodes) {
        ctx.fillStyle = "#5ef6ff";
        ctx.beginPath(); ctx.arc(n.x, n.y, 1.5, 0, 7); ctx.fill();
      }
    };
    const loop = () => { if (!running) return; draw(); raf = requestAnimationFrame(loop); };
    resize(); init(); reduce ? draw() : loop();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => ((mouse.x = -9999), (mouse.y = -9999));
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    const io = new IntersectionObserver(([e]) => {
      if (reduce) return;
      if (e.isIntersecting && !running) { running = true; loop(); }
      else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(sec.current!);
    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      io.disconnect();
    };
  }, []);

  return (
    <section ref={sec} className="relative flex h-screen flex-col justify-center overflow-hidden bg-ink px-6 md:px-16">
      <canvas ref={cv} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-sulfur">
          portfolio // {new Date().getFullYear()}
        </p>
        <h1 className="mt-6 font-display font-bold leading-[0.86] tracking-tightest text-bone text-[clamp(3rem,11vw,10rem)]">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl font-mono text-base text-bone/80 md:text-xl">
          <span className="text-sulfur">{profile.role}</span>
          <br />
          {profile.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#work" className="border border-sulfur bg-sulfur px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-transparent hover:text-sulfur">
            View work ↓
          </a>
          <a href="#contact" className="border border-sulfur/40 px-7 py-3 font-mono text-xs uppercase tracking-[0.25em] text-sulfur transition-colors hover:border-sulfur">
            Get in touch
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-ash">
        scroll
      </div>
    </section>
  );
}
