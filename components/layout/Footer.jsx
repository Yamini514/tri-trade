import Link from "next/link";
import { Send, Video, Camera, AtSign } from "lucide-react";
import { Disclaimer } from "@/components/shared/Disclaimer";
import { Logo } from "@/components/shared/Logo";
import { whatsappLink } from "@/lib/site";

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

// Compliance / utility links shown in the bottom bar.
const legalLinks = [
  { label: "Market Risk Disclosure", href: "#" },
  { label: "Educational Purpose Only", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: whatsappLink() },
  { label: "Data Sources", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-background-alt">
      <div className="container-wide py-14">
        {/* Main footer card */}
        <div className="rounded-[2rem] border border-line bg-surface p-8 shadow-card sm:p-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Logo />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">
                Precision trade calls and education for disciplined retail
                traders in the Indian markets. Clarity over hype.
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

          <div className="mt-10 border-t border-line pt-8">
            <Disclaimer />
          </div>
        </div>

        {/* Bottom bar: compliance links + copyright */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <nav
            aria-label="Legal and compliance"
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-xs font-medium text-ink-3 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="text-xs text-ink-3">
            Copyright © 2026 HeyFund. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
