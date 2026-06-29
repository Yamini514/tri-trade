"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const marketLinks = [
  { label: "Overview", href: "/markets" },
  { label: "Sector Heatmap", href: "/markets#heatmap" },
  { label: "Option Chain", href: "/markets#option-chain" },
];

const learnLinks = [
  { label: "Courses", href: "/learn#courses" },
  { label: "Candlesticks", href: "/learn#candlesticks" },
  { label: "Strategies", href: "/learn#strategies" },
  { label: "Glossary", href: "/learn#glossary" },
];

const moreLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/about#team" },
  { label: "News & Updates", href: "/about#news" },
];

function Dropdown({ label, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium text-ink-2 hover:text-ink transition-colors">
        {label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          >
            <div className="min-w-[200px] overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-large">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur shadow-card border-b border-line"
          : "bg-transparent",
      )}
    >
      <nav className="container-wide flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="font-serif text-3xl leading-none text-primary"
        >
          HeyFund
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <Dropdown label="Markets" links={marketLinks} />
          <Dropdown label="Learn" links={learnLinks} />
          <Link
            href="/tools"
            className="text-sm font-medium text-ink-2 hover:text-ink transition-colors"
          >
            Tools
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-ink-2 hover:text-ink transition-colors"
          >
            Pricing
          </Link>
          <Dropdown label="More" links={moreLinks} />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/pricing" variant="ghost" size="sm">
            Login
          </Button>
          <Button href="/pricing" variant="dark" size="sm">
            Join Free
          </Button>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-ink"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden border-t border-line bg-white"
          >
            <div className="container-wide flex flex-col gap-1 py-4">
              <MobileGroup label="Markets" links={marketLinks} />
              <MobileGroup label="Learn" links={learnLinks} />
              <MobileLink href="/tools">Tools</MobileLink>
              <MobileLink href="/pricing">Pricing</MobileLink>
              <MobileGroup label="More" links={moreLinks} />
              <div className="mt-3 flex flex-col gap-2">
                <Button href="/pricing" variant="white" size="md">
                  Login
                </Button>
                <Button href="/pricing" variant="dark" size="md">
                  Join Free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileLink({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-surface-2"
    >
      {children}
    </Link>
  );
}

function MobileGroup({ label, links }) {
  return (
    <div className="px-3 py-2">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink-3">
        {label}
      </div>
      <div className="flex flex-col">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-2 hover:bg-surface-2 hover:text-ink"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
