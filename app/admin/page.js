"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/admin/auth";

/** /admin -> dashboard when signed in, otherwise the login screen. */
export default function AdminIndexPage() {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "authed") router.replace("/admin/dashboard");
    else if (status === "anon") router.replace("/admin/login");
  }, [status, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-bg">
      <Loader2 className="h-6 w-6 animate-spin text-admin-fg-subtle" />
    </div>
  );
}
