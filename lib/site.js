/* ============================================================
   HeyFund — Site-wide contact & compliance config
   ============================================================ */

/**
 * WhatsApp business number — digits only, country code first, no "+".
 */
export const WHATSAPP_NUMBER = "918500250263";

/** Public Telegram channel — used by the Free plan CTA. */
export const TELEGRAM_LINK = "https://t.me/heyfund";

/** Build a wa.me deep link with an optional pre-filled message. */
export function whatsappLink(message = "") {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Official SEBI website — opened in a new tab from the disclaimer. */
export const SEBI_WEBSITE = "https://www.sebi.gov.in";

/**
 * SEBI compliance disclaimer shown in the footer and above the hero.
 */
export const SEBI_DISCLAIMER =
  "We are not registered with the Securities and Exchange Board of India (SEBI). The information, market data, charts, analysis, and educational content provided on this platform are for informational and educational purposes only. Nothing on this platform constitutes investment, financial, or trading advice. Users should conduct their own research and consult a SEBI-registered investment advisor before making any investment decisions. Trading and investing in financial markets involve risk, and users are solely responsible for their decisions.";
