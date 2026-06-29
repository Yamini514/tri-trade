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

function TestimonialCard({ t }) {
  return (
    <figure className="flex h-full w-[85vw] shrink-0 flex-col rounded-3xl border border-line bg-white p-7 shadow-card sm:w-[380px]">
      <Quote className="h-8 w-8 text-primary/30" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink-2">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-5">
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
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // Duplicated once so the -50% keyframe loops seamlessly.
  const track = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-background py-16 md:py-24">
      <div className="container-wide">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <SectionLabel>Testimonials</SectionLabel>
          </div>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Traders who trust us
          </h2>
        </Reveal>
      </div>

      {/* edge-faded, auto-scrolling track (pauses on hover/focus) */}
      <div
        className="marquee-pause group relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <ul
          className="animate-marquee flex w-max"
          style={{ "--marquee-duration": "50s" }}
          aria-label="Trader testimonials"
        >
          {track.map((t, i) => (
            // px-3 (not flex `gap`) keeps the -50% loop seamless across the
            // duplicated set, matching the ticker-tape pattern.
            <li
              key={`${t.id}-${i}`}
              className="px-3"
              aria-hidden={i >= testimonials.length}
            >
              <TestimonialCard t={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
