/** Lightweight skeleton for below-the-fold sections to avoid layout shift and improve perceived load */
export function SectionSkeleton() {
  return (
    <section className="w-full py-2 h-fit animate-pulse" aria-hidden>
      <div className="flex flex-row items-center justify-between py-6 px-2">
        <div className="h-10 w-48 rounded bg-muted" />
        <div className="h-9 w-32 rounded-full bg-muted" />
      </div>
      <div className="flex gap-4 overflow-hidden px-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-64 w-40 md:h-96 md:w-60 shrink-0 rounded-lg bg-muted"
          />
        ))}
      </div>
    </section>
  );
}
