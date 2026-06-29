"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SEBI_DISCLAIMER } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative bg-background">
      {/* SEBI compliance disclaimer */}
      <div className="border-b border-line bg-surface-2/70">
        <div className="container-wide py-2.5">
          <p className="mx-auto flex max-w-4xl items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-ink-3 sm:text-xs">
            <ShieldCheck className="mt-px hidden h-3.5 w-3.5 shrink-0 sm:block" />
            <span>{SEBI_DISCLAIMER}</span>
          </p>
        </div>
      </div>

      <div className="container-wide flex flex-col items-center py-20 text-center md:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-4xl flex-col items-center"
        >
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-ink-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-live-pulse" />
            Live trade calls · NSE &amp; BSE
          </motion.span>

          <motion.h1
            variants={item}
            className="font-serif leading-[1.02] text-ink"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            Precision trading calls for{" "}
            <span className="text-primary">Indian</span>{" "}
            <span className="text-hero-red">markets.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2"
          >
            We publish high-conviction intraday, options, and swing ideas. Built
            for disciplined retail traders who value clarity over hype.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button href="/pricing" variant="dark" size="lg">
              Join Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#snapshot" variant="white" size="lg">
              View today&apos;s calls
            </Button>
          </motion.div>

          <motion.p variants={item} className="mt-6 text-xs text-ink-3">
            For educational &amp; informational purposes. Markets carry risk.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
