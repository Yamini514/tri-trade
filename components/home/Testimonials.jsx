import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/mock-data";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-gold text-gold" : "fill-black/10 text-black/10"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-wide">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <SectionLabel>Testimonials</SectionLabel>
          </div>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Traders who trust us
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-card">
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="mt-4 flex-1 text-base leading-relaxed text-ink-2">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light font-semibold text-primary">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs text-ink-3">{t.handle}</div>
                    </div>
                  </div>
                  <Stars rating={t.rating} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
