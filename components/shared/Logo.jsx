import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * HeyFund wordmark — "Hey" in brand green, "Fund" in maroon red.
 * Renders a Link by default; pass `as="span"` for non-navigational contexts.
 */
export function Logo({ className, href = "/", as }) {
  const content = (
    <>
      <span className="text-primary">Hey</span>
      <span className="text-hero-red">Fund</span>
    </>
  );

  const classes = cn(
    "font-serif text-3xl leading-none tracking-tight",
    className,
  );

  if (as === "span") {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link href={href} aria-label="HeyFund home" className={classes}>
      {content}
    </Link>
  );
}
