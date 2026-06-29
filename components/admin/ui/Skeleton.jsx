import { cn } from "@/lib/utils";

/** Shimmering placeholder block for loading states. */
export function Skeleton({ className }) {
  return <div className={cn("admin-skeleton rounded-md", className)} />;
}
