import { PageHeader } from "@/components/shared/PageHeader";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/shared/CountUp";
import { Badge } from "@/components/ui/Badge";
import { team, newsItems, stats } from "@/lib/mock-data";

export const metadata = {
  title: "About — HeyFund",
  description: "Our story, our team, and the latest from the HeyFund desk.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        dark
        label="About HeyFund"
        title="Discipline, not hype. Built by traders, for traders."
        subtitle="We started HeyFund to give retail traders the structure professional desks take for granted — clear setups, defined risk, and an honest track record."
      />

      {/* Our Story */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              From a trading desk to a community
            </h2>
            <div className="mt-6 space-y-4 text-ink-2 leading-relaxed">
              <p>
                HeyFund began in 2014 as a private group of full-time traders
                sharing setups before the open. The rule was simple: no call goes
                out without an entry, a target, and a stop-loss.
              </p>
              <p>
                Over a decade later, that discipline is still the core of
                everything we do. We publish both our wins and our losses,
                because a track record only means something if it&apos;s
                complete.
              </p>
              <p>
                Today, 2,300+ traders rely on HeyFund for timed calls, education,
                and tools — all designed around one idea: clarity over hype.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-3xl border border-line bg-white p-7 shadow-card"
                >
                  <div className="font-serif text-4xl text-primary md:text-5xl">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-sm text-ink-2">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="scroll-mt-24 bg-surface-2 py-16 md:py-24">
        <div className="container-wide">
          <Reveal className="text-center">
            <div className="flex justify-center">
              <SectionLabel>The Team</SectionLabel>
            </div>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              The people behind the desk
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-card">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary font-serif text-2xl text-white">
                    {m.initials}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{m.name}</h3>
                  <div className="text-sm font-medium text-primary">{m.role}</div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section id="news" className="scroll-mt-24 bg-background py-16 md:py-24">
        <div className="container-wide">
          <Reveal>
            <SectionLabel>News &amp; Updates</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              From the HeyFund desk
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {newsItems.map((n, i) => (
              <Reveal key={n.id} delay={i * 0.05}>
                <article className="h-full rounded-3xl border border-line bg-white p-7 shadow-card transition-transform duration-200 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <Badge tone="long">{n.tag}</Badge>
                    <time className="text-xs text-ink-3">{n.date}</time>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-ink">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{n.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
