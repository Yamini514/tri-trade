import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants = {
  dark: "bg-ink text-white hover:bg-black hover:-translate-y-0.5 shadow-card",
  primary: "bg-primary text-white hover:bg-[#155730] hover:-translate-y-0.5 shadow-card",
  outline: "bg-transparent text-ink border border-ink/20 hover:border-ink/40 hover:-translate-y-0.5",
  white: "bg-white text-ink border border-line hover:bg-surface-2 hover:-translate-y-0.5 shadow-card",
  ghost: "bg-transparent text-ink hover:bg-black/5",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

/**
 * Polymorphic button. Renders a Next <Link> when `href` is provided,
 * otherwise a native <button>.
 */
export function Button({
  variant = "dark",
  size = "md",
  href,
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    // External links (WhatsApp, tel, mailto, absolute URLs) render a plain
    // anchor opening in a new tab — Next <Link> is only for in-app routes.
    const isExternal = /^(https?:|wa\.me|tel:|mailto:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
