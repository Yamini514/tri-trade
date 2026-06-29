import { PageHeader } from "@/components/shared/PageHeader";
import { PricingCards } from "@/components/PricingCards";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/shared/Reveal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { faqs } from "@/lib/mock-data";

export const metadata = {
  title: "Pricing — HeyFund",
  description: "Simple, transparent plans. Start free and upgrade when you're ready.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        label="Pricing"
        title="Plans that scale with your conviction"
        subtitle="Start free, upgrade when you're ready. Every paid plan is cancel-anytime — no phone calls, no retention scripts."
      />

      <section className="bg-background py-16 md:py-20">
        <div className="container-wide">
          <PricingCards />
        </div>
      </section>

      <section className="bg-surface-2 py-16 md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              Pricing questions
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-[2rem] border border-line bg-white px-7 shadow-card">
              <Accordion items={faqs} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
