import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names, resolving conflicts. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Format a number as Indian-style currency (₹ with lakh/crore grouping). */
export function formatINR(value, opts = {}) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: opts.decimals ?? 2,
    minimumFractionDigits: opts.decimals ?? 0,
  }).format(value);
}

/** Format a plain number with Indian grouping. */
export function formatNumber(value, decimals = 2) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}
