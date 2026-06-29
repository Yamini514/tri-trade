"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  UserCheck,
  CandlestickChart,
  ShoppingCart,
  IndianRupee,
  Radio,
  RefreshCw,
  AlertCircle,
  Bell,
  UserPlus,
} from "lucide-react";
import { dashboardApi } from "@/lib/admin/api";
import { DEMO_MODE } from "@/lib/admin/config";
import { DEMO_OVERVIEW } from "@/lib/admin/demo-data";
import { formatNumber, formatINR } from "@/lib/utils";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import { SignupsChart } from "@/components/admin/dashboard/SignupsChart";
import { RolesChart } from "@/components/admin/dashboard/RolesChart";
import { SystemStatus } from "@/components/admin/dashboard/SystemStatus";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/admin/ui/Card";
import { Badge } from "@/components/admin/ui/Badge";
import { Button } from "@/components/admin/ui/Button";
import { Skeleton } from "@/components/admin/ui/Skeleton";

function relativeTime(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [demo, setDemo] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dashboardApi.overview();
      setData(res);
      setDemo(false);
    } catch (err) {
      if (DEMO_MODE) {
        setData(DEMO_OVERVIEW);
        setDemo(true);
      } else {
        setError(err.message || "Failed to load dashboard.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const pending = data?.meta?.pending || [];
  const isPending = (k) => pending.includes(k);
  const stats = data?.stats || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-admin-fg">Dashboard</h1>
          <p className="mt-1 text-sm text-admin-fg-muted">
            Platform health and activity at a glance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {demo && <Badge tone="warning">Demo data</Badge>}
          <Button variant="secondary" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-admin-danger-soft text-admin-danger">
              <AlertCircle className="h-6 w-6" />
            </span>
            <p className="text-sm font-medium text-admin-fg">Couldn’t load the dashboard</p>
            <p className="mt-1 max-w-sm text-sm text-admin-fg-muted">{error}</p>
            <Button className="mt-4" size="sm" onClick={load}>
              Try again
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* KPI grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
            <StatCard
              label="Total Users"
              icon={Users}
              loading={loading}
              value={formatNumber(stats.total_users, 0)}
            />
            <StatCard
              label="Active Users"
              icon={UserCheck}
              loading={loading}
              value={formatNumber(stats.active_users, 0)}
            />
            <StatCard
              label="Live Sessions"
              icon={Radio}
              loading={loading}
              value={formatNumber(stats.live_sessions, 0)}
            />
            <StatCard
              label="Total Trades"
              icon={CandlestickChart}
              loading={loading}
              pending={isPending("total_trades")}
              value={formatNumber(stats.total_trades, 0)}
            />
            <StatCard
              label="Orders Today"
              icon={ShoppingCart}
              loading={loading}
              pending={isPending("orders_today")}
              value={formatNumber(stats.orders_today, 0)}
            />
            <StatCard
              label="Revenue"
              icon={IndianRupee}
              loading={loading}
              pending={isPending("revenue")}
              value={formatINR((stats.revenue || 0) / 100, { decimals: 0 })}
            />
          </div>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>New sign-ups</CardTitle>
                <span className="text-xs text-admin-fg-subtle">Last 14 days</span>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <Skeleton className="h-[260px] w-full" />
                ) : (
                  <SignupsChart data={data?.breakdowns?.signups} />
                )}
              </CardBody>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Users by role</CardTitle>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <Skeleton className="h-[260px] w-full" />
                ) : (
                  <RolesChart data={data?.breakdowns?.users_by_role} />
                )}
              </CardBody>
            </Card>
          </div>

          {/* Activity + status + notifications */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
              </CardHeader>
              <CardBody className="py-2">
                {loading ? (
                  <div className="space-y-3 py-2">
                    {[0, 1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : data?.recent_activity?.length ? (
                  <ul className="divide-y divide-admin-border">
                    {data.recent_activity.map((a) => (
                      <li key={a.id} className="flex items-center gap-3 py-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-admin-primary-soft text-admin-primary">
                          <UserPlus className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-admin-fg">{a.title}</p>
                          <p className="text-xs text-admin-fg-subtle">{a.subtitle}</p>
                        </div>
                        <span className="shrink-0 text-xs text-admin-fg-subtle">
                          {relativeTime(a.at)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-6 text-center text-sm text-admin-fg-subtle">
                    No recent activity.
                  </p>
                )}
              </CardBody>
            </Card>

            <div className="lg:col-span-1">
              <SystemStatus system={data?.system} loading={loading} />
            </div>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <Skeleton className="h-20 w-full" />
                ) : data?.notifications?.length ? (
                  <ul className="space-y-3">
                    {data.notifications.map((n, i) => (
                      <li key={i} className="text-sm text-admin-fg-muted">
                        {n.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Bell className="mb-2 h-6 w-6 text-admin-fg-subtle" />
                    <p className="text-sm text-admin-fg-subtle">You’re all caught up.</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
