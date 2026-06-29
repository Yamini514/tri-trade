import { ThemeProvider } from "@/components/admin/providers/ThemeProvider";
import { ToastProvider } from "@/components/admin/providers/ToastProvider";
import { AuthProvider } from "@/lib/admin/auth";

export const metadata = {
  title: "Trio Trade — Admin",
  description: "Trio Trade administration dashboard.",
  robots: { index: false, follow: false },
};

/**
 * Root of the /admin panel. Owns the theme, auth, and toast providers for
 * everything beneath it (including the login screen) but renders no chrome —
 * the authenticated shell lives in the (panel) route group.
 */
export default function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
