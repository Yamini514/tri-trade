import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";

export function CtaBanner() {
  return (
    <section className="bg-background pb-20 md:pb-28">
      <div className="container-wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center md:px-16 md:py-20">
            {/* decorative glow */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight text-white md:text-6xl">
                Start trading with conviction.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
                Join 2,300+ disciplined traders getting timed, high-conviction
                calls on the Indian markets — every session.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/pricing" variant="white" size="lg">
                  Join Now <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href="/pricing"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:border-white/60"
                >
                  Explore Pricing
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
