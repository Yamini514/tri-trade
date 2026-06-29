import { Card } from "@/components/admin/ui/Card";
import { Badge } from "@/components/admin/ui/Badge";
import { Skeleton } from "@/components/admin/ui/Skeleton";
import { cn } from "@/lib/utils";

/**
 * KPI tile. Pass `loading` for the skeleton state and `pending` to mark a metric
 * whose backing feature isn't built yet (renders a "Soon" badge instead of a
 * misleading number).
 */
export function StatCard({ label, value, icon: Icon, delta, pending = false, loading = false }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-sm text-admin-fg-muted">{label}</span>
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-admin-primary-soft text-admin-primary">
            <Icon className="h-[18px] w-[18px]" />
          </span>
        )}
      </div>

      {loading ? (
        <Skeleton className="mt-3 h-8 w-24" />
      ) : pending ? (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-2xl font-semibold text-admin-fg-subtle">—</span>
          <Badge tone="outline">Soon</Badge>
        </div>
      ) : (
        <div className="mt-2 text-3xl font-semibold tracking-tight text-admin-fg">
          {value}
        </div>
      )}

      {!loading && !pending && delta && (
        <div className="mt-1.5">
          <span
            className={cn(
              "text-xs font-medium",
              delta.positive ? "text-admin-success" : "text-admin-danger",
            )}
          >
            {delta.positive ? "▲" : "▼"} {delta.label}
          </span>
        </div>
      )}
    </Card>
  );
}
