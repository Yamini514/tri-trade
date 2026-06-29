import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "HeyFund — Precision trading calls for Indian markets",
  description:
    "High-conviction intraday, options, and swing ideas for disciplined retail traders. Trade calls, education, and tools for the Indian stock market.",
};

/**
 * Root layout — intentionally minimal. It only owns <html>/<body>, fonts, and
 * global CSS. Chrome (navbar/footer) lives in the (marketing) route group, and
 * the admin panel ships its own shell under /admin, so neither leaks into the
 * other.
 */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
