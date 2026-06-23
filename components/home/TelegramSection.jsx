import { Send, Check, Zap, ShieldCheck, Clock, Users } from "lucide-react";
import { telegramMessages, telegramFeatures } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";

const featureIcons = [Zap, ShieldCheck, Clock, Users];

export function TelegramSection() {
  return (
    <section className="bg-surface-2 py-16 md:py-24">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-2">
        {/* Left: copy */}
        <Reveal>
          <SectionLabel>On Telegram</SectionLabel>
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            Calls land on your phone the second they go live.
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-2">
            Join 2,300+ traders on our verified channel. No noise, no hype —
            just timed setups and pre-market briefs you can act on.
          </p>

          <ul className="mt-7 space-y-4">
            {telegramFeatures.map((f, i) => {
              const Icon = featureIcons[i] ?? Check;
              return (
                <li key={f} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-ink">{f}</span>
                </li>
              );
            })}
          </ul>

          <Button href="/pricing" variant="dark" size="lg" className="mt-8">
            <Send className="h-4 w-4" /> Join the channel
          </Button>
        </Reveal>

        {/* Right: simulated chat */}
        <Reveal delay={0.08}>
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-line bg-[#0E1621] shadow-large">
            {/* header */}
            <div className="flex items-center gap-3 bg-[#1c93e3] px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  HeyFund · Official
                </div>
                <div className="text-xs text-white/80">2,300 members · online</div>
              </div>
            </div>
            {/* messages */}
            <div className="flex flex-col gap-3 px-4 py-5">
              {telegramMessages.map((m) => (
                <div
                  key={m.id}
                  className="max-w-[88%] self-start rounded-2xl rounded-tl-sm bg-[#182533] px-4 py-3"
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed text-white/90">
                    {m.text}
                  </p>
                  <div className="mt-1.5 text-right text-[10px] text-white/40">
                    {m.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
