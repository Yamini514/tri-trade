export const GA_MEASUREMENT_ID = "G-N81GG1K53D";

export const isProduction = process.env.NODE_ENV === "production";

/** Track a SPA page view (route change). */
export function pageview(url) {
  if (!isProduction || typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/** Track a custom event. */
export function trackEvent(action, params = {}) {
  if (!isProduction || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
}
