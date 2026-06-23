import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { PricingCards } from "@/components/PricingCards";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-surface-2 py-16 md:py-24">
      <div className="container-wide">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <SectionLabel>Pricing</SectionLabel>
          </div>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Plans that scale with your conviction
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-2">
            Start free, upgrade when you&apos;re ready. Cancel anytime — no
            phone calls, no retention scripts.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <PricingCards />
        </Reveal>
      </div>
    </section>
  );
}
