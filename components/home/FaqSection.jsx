import { faqs } from "@/lib/mock-data";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export function FaqSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Common questions
          </h2>
          <p className="mt-4 max-w-sm text-ink-2">
            Everything you need to know before you join. Still curious? Reach out
            on Telegram.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="rounded-[2rem] border border-line bg-white px-7 shadow-card">
            <Accordion items={faqs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
