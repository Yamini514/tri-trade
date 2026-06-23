import Link from "next/link";
import { Send, Video, Camera, AtSign } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Markets", href: "/markets" },
      { label: "Tools", href: "/tools" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Courses", href: "/learn#courses" },
      { label: "Candlesticks", href: "/learn#candlesticks" },
      { label: "Strategies", href: "/learn#strategies" },
      { label: "Glossary", href: "/learn#glossary" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about#team" },
      { label: "News & Updates", href: "/about#news" },
      { label: "Join Free", href: "/pricing" },
    ],
  },
];

const socials = [
  { Icon: Send, label: "Telegram" },
  { Icon: Video, label: "YouTube" },
  { Icon: Camera, label: "Instagram" },
  { Icon: AtSign, label: "X" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-background-alt">
      <div className="container-wide py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-3xl text-primary">
              HeyFund
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">
              Precision trade calls and education for disciplined retail traders
              in the Indian markets. Clarity over hype.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-colors hover:text-primary hover:border-primary/30"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-2 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs leading-relaxed text-ink-3">
            <strong className="text-ink-2">Disclaimer:</strong> HeyFund is for
            educational &amp; informational purposes only and is not investment
            advice. Trading in securities and derivatives carries substantial
            risk of loss. Past performance is not indicative of future results.
            Consult a SEBI-registered adviser before investing.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-3">
              © {2026} HeyFund. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-ink-3">
              <a href="#" className="hover:text-ink-2">Terms</a>
              <a href="#" className="hover:text-ink-2">Privacy</a>
              <a href="#" className="hover:text-ink-2">Risk Disclosure</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
