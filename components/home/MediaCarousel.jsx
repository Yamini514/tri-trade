"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Camera, Image as ImageIcon } from "lucide-react";
import { mediaItems } from "@/lib/mock-data";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const typeMeta = {
  youtube: { label: "YouTube", Icon: Play },
  instagram: { label: "Reel", Icon: Camera },
  photo: { label: "Photo", Icon: ImageIcon },
};

function MainMedia({ item }) {
  if (item.type === "youtube" && item.embedId) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${item.embedId}`}
        title={item.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  // Instagram reel / photo placeholder (no external asset needed)
  const { Icon, label } = typeMeta[item.type];
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center text-white"
      style={{ background: `linear-gradient(135deg, ${item.thumbColor}, #1A1A1A)` }}
    >
      <Icon className="h-12 w-12 opacity-90" />
      <span className="mt-3 text-sm font-medium uppercase tracking-wider opacity-80">
        {label}
      </span>
    </div>
  );
}

export function MediaCarousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next) => {
    setDir(next > active ? 1 : -1);
    setActive((next + mediaItems.length) % mediaItems.length);
  };

  const item = mediaItems[active];

  return (
    <section className="bg-surface-2 py-16 md:py-24">
      <div className="container-wide">
        <Reveal>
          <SectionLabel>From the Desk</SectionLabel>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Watch, Follow &amp; Explore
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Main card */}
          <Reveal className="lg:col-span-2" delay={0.05}>
            <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-medium">
              <div className="relative h-[400px] w-full overflow-hidden bg-ink">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={item.id}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -40 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <MainMedia item={item} />
                  </motion.div>
                </AnimatePresence>

                {/* arrows */}
                <button
                  onClick={() => go(active - 1)}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(active + 1)}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-2">{item.subtitle}</p>
                </div>
                <div className="flex gap-1.5">
                  {mediaItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      aria-label={`Go to item ${i + 1}`}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        i === active ? "w-6 bg-primary" : "w-2 bg-black/15",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Thumbnail strip */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              {mediaItems.map((m, i) => {
                const { Icon, label } = typeMeta[m.type];
                const isActive = i === active;
                return (
                  <button
                    key={m.id}
                    onClick={() => go(i)}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border p-3 text-left transition-all",
                      isActive
                        ? "border-primary/40 bg-white shadow-card"
                        : "border-line bg-white/60 hover:bg-white",
                    )}
                  >
                    <span
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ background: m.thumbColor }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {label}
                      </div>
                      <div className="truncate text-sm font-medium text-ink">
                        {m.title}
                      </div>
                      <div className="truncate text-xs text-ink-3">{m.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
