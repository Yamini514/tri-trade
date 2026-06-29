/* ============================================================
   HeyFund — Site-wide contact & compliance config
   ============================================================ */

/**
 * WhatsApp business number — digits only, country code first, no "+".
 * NOTE: this is a SAMPLE placeholder — replace with the real number.
 */
export const WHATSAPP_NUMBER = "919999999999";

/** Build a wa.me deep link with an optional pre-filled message. */
export function whatsappLink(message = "") {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * SEBI compliance disclaimer shown above the hero.
 * NOTE: replace INHXXXXXXXXX with the actual SEBI registration number.
 */
export const SEBI_DISCLAIMER =
  "Investments in the securities market are subject to market risks; read all related documents carefully. HeyFund is not a SEBI-registered investment adviser — all content is for educational purposes only and is not investment advice. SEBI Reg. No.: INHXXXXXXXXX.";
