"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/admin/auth";
import { useToast } from "@/components/admin/providers/ToastProvider";
import { Button } from "@/components/admin/ui/Button";

export default function AdminLoginPage() {
  const { login, status } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Already signed in? Skip the form.
  useEffect(() => {
    if (status === "authed") router.replace("/admin/dashboard");
  }, [status, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const user = await login(email.trim(), password);
      toast.success("Welcome back", user?.full_name);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-admin-primary text-lg font-bold text-admin-primary-fg">
            T
          </span>
          <h1 className="text-xl font-semibold text-admin-fg">Trio Trade Admin</h1>
          <p className="mt-1 text-sm text-admin-fg-muted">Sign in to your dashboard</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-admin-border bg-admin-surface p-6 admin-shadow"
        >
          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-admin-danger-soft px-3 py-2.5 text-sm text-admin-danger">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-admin-fg">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2.5 text-sm text-admin-fg outline-none transition-colors placeholder:text-admin-fg-subtle focus:border-admin-primary focus:ring-2 focus:ring-[var(--admin-ring)]"
              placeholder="you@triotrade.dev"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-admin-fg">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2.5 pr-10 text-sm text-admin-fg outline-none transition-colors placeholder:text-admin-fg-subtle focus:border-admin-primary focus:ring-2 focus:ring-[var(--admin-ring)]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-admin-fg-subtle hover:text-admin-fg"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" loading={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
