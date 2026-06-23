import { steps, stats } from "@/lib/mock-data";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/shared/CountUp";

export function StepsSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-wide">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <SectionLabel>How it works</SectionLabel>
          </div>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Three steps to trading with a plan
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative h-full rounded-3xl border border-line bg-white p-7 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-serif text-xl text-white">
                  {s.n}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats row */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 gap-4 rounded-[2rem] bg-ink px-6 py-10 text-white md:grid-cols-4 md:px-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-4xl md:text-5xl">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
