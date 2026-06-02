/** Consistent corner label so each effect is clearly identified. */
export default function EffectLabel({
  index,
  name,
  tech,
}: {
  index: string;
  name: string;
  tech: string;
}) {
  return (
    <div className="pointer-events-none absolute left-6 top-6 z-30 md:left-10 md:top-10">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-sulfur">{index}</span>
        <span className="h-px w-8 bg-sulfur/40" />
        <span className="font-display text-2xl leading-none text-bone md:text-3xl">
          {name}
        </span>
      </div>
      <p className="mt-2 pl-[3.1rem] font-mono text-[10px] uppercase tracking-[0.3em] text-ash">
        {tech}
      </p>
    </div>
  );
}
