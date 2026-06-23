"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, BookOpen, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  courses,
  candlestickPatterns,
  strategies,
  glossary,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "courses", label: "Courses" },
  { id: "candlesticks", label: "Candlesticks" },
  { id: "strategies", label: "Strategies" },
  { id: "glossary", label: "Glossary" },
];

const sentimentMeta = {
  bullish: { tone: "bullish", Icon: TrendingUp },
  bearish: { tone: "bearish", Icon: TrendingDown },
  neutral: { tone: "neutral", Icon: Minus },
};

const levelTone = {
  Beginner: "long",
  Intermediate: "gold",
  Advanced: "short",
};

function Courses() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => (
        <div
          key={c.id}
          className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-transform duration-200 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <BookOpen className="h-5 w-5" />
            </span>
            <Badge tone={levelTone[c.level]}>{c.level}</Badge>
          </div>
          <h3 className="mt-5 text-lg font-semibold text-ink">{c.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">
            {c.description}
          </p>
          <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-xs text-ink-3">
            <span>{c.lessons} lessons</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {c.duration}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Candlesticks() {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "bullish", "bearish", "neutral"];
  const list =
    filter === "all"
      ? candlestickPatterns
      : candlestickPatterns.filter((p) => p.sentiment === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors",
              filter === f
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink-2 hover:text-ink",
            )}
          >
            {f} {f !== "all" && `(${candlestickPatterns.filter((p) => p.sentiment === f).length})`}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => {
          const { tone, Icon } = sentimentMeta[p.sentiment];
          return (
            <div
              key={p.name}
              className="rounded-3xl border border-line bg-white p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-ink">{p.name}</h3>
                <Badge tone={tone}>
                  <Icon className="h-3 w-3" />
                  {p.sentiment}
                </Badge>
              </div>
              <div className="mt-1 text-xs text-ink-3">
                {p.candles} candle{p.candles > 1 ? "s" : ""}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Strategies() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {strategies.map((s) => (
        <div
          key={s.id}
          className="rounded-3xl border border-line bg-white p-6 shadow-card"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="outline">{s.type}</Badge>
            <Badge tone={levelTone[s.difficulty]}>{s.difficulty}</Badge>
            <span className="text-xs text-ink-3">{s.timeframe}</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-ink">{s.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.summary}</p>
          <ol className="mt-4 space-y-2">
            {s.rules.map((r, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function Glossary() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <dl className="divide-y divide-line">
        {glossary.map((g) => (
          <div
            key={g.term}
            className="grid gap-1 px-6 py-5 sm:grid-cols-[200px_1fr] sm:gap-6"
          >
            <dt className="font-semibold text-ink">{g.term}</dt>
            <dd className="text-sm leading-relaxed text-ink-2">{g.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const PANELS = { courses: Courses, candlesticks: Candlesticks, strategies: Strategies, glossary: Glossary };

export function LearnTabs() {
  const [active, setActive] = useState("courses");

  // read hash on mount and on hash change for deep-linking
  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.replace("#", "");
      if (TABS.some((t) => t.id === hash)) setActive(hash);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const selectTab = (id) => {
    setActive(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const Panel = PANELS[active];

  return (
    <div>
      {/* sticky tab bar */}
      <div className="sticky top-[72px] z-30 -mx-5 mb-8 border-b border-line bg-background/90 px-5 backdrop-blur">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => selectTab(t.id)}
              className={cn(
                "relative whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors",
                active === t.id ? "text-ink" : "text-ink-3 hover:text-ink-2",
              )}
            >
              {t.label}
              {active === t.id && (
                <motion.span
                  layoutId="learn-tab-underline"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Panel />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
