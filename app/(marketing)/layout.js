import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";

/**
 * Marketing shell — the public site chrome. Scoped to the (marketing) route
 * group so it wraps the landing pages but never the admin panel.
 */
export default function MarketingLayout({ children }) {
  return (
    <div className="flex min-h-full flex-col bg-background text-ink">
      <Analytics />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
