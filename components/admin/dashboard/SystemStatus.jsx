import { Activity, Database, Server } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/admin/ui/Card";
import { StatusDot } from "@/components/admin/ui/Badge";
import { Skeleton } from "@/components/admin/ui/Skeleton";

const STATUS_TONE = {
  operational: "success",
  connected: "success",
  online: "success",
  degraded: "warning",
  down: "danger",
};

function Row({ icon: Icon, label, status, value, hint }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <span className="flex items-center gap-2.5 text-sm text-admin-fg-muted">
        <Icon className="h-4 w-4 text-admin-fg-subtle" />
        {label}
      </span>
      <span className="flex items-center gap-2 text-right">
        {hint && <span className="text-xs text-admin-fg-subtle">{hint}</span>}
        <StatusDot tone={STATUS_TONE[status] || "neutral"}>{value}</StatusDot>
      </span>
    </div>
  );
}

export function SystemStatus({ system, loading }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System status</CardTitle>
      </CardHeader>
      <CardBody className="divide-y divide-admin-border py-1">
        {loading ? (
          <div className="space-y-3 py-2">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        ) : (
          <>
            <Row
              icon={Activity}
              label="API Health"
              status={system?.api?.status}
              value={system?.api?.label}
            />
            <Row
              icon={Database}
              label="Database"
              status={system?.database?.status}
              value={system?.database?.label}
              hint={
                system?.database?.latency_ms != null
                  ? `${system.database.latency_ms} ms`
                  : null
              }
            />
            <Row
              icon={Server}
              label="Server"
              status={system?.server?.status}
              value={system?.server?.label}
              hint={system?.server?.env}
            />
          </>
        )}
      </CardBody>
    </Card>
  );
}
