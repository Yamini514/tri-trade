"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";

function BillingToggle({ annual, setAnnual }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1 shadow-card">
      <button
        onClick={() => setAnnual(false)}
        className={cn(
          "rounded-full px-5 py-2 text-sm font-medium transition-colors",
          !annual ? "bg-ink text-white" : "text-ink-2 hover:text-ink",
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => setAnnual(true)}
        className={cn(
          "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors",
          annual ? "bg-ink text-white" : "text-ink-2 hover:text-ink",
        )}
      >
        Annual
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold",
            annual ? "bg-emerald-500/20 text-emerald-300" : "bg-primary-light text-primary",
          )}
        >
          Save 20%
        </span>
      </button>
    </div>
  );
}

function PlanCard({ plan, annual }) {
  const price = annual ? plan.annual : plan.monthly;
  const featured = plan.featured;
  const billing =
    price === 0 ? "" : ` (₹${price.toLocaleString("en-IN")}/mo${annual ? ", billed annually" : ""})`;
  const waMessage = `Hi HeyFund, I'm interested in the ${plan.name} plan${billing}. Please share the next steps to get started.`;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative flex h-full flex-col rounded-[2rem] border p-7 shadow-card",
        featured
          ? "border-primary bg-primary text-white shadow-large"
          : "border-line bg-white",
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge tone="gold" className="bg-gold text-white shadow-card">
            Most popular
          </Badge>
        </span>
      )}
      <div>
        <h3
          className={cn(
            "text-lg font-semibold",
            featured ? "text-white" : "text-ink",
          )}
        >
          {plan.name}
        </h3>
        <p className={cn("mt-1 text-sm", featured ? "text-white/70" : "text-ink-3")}>
          {plan.tagline}
        </p>
      </div>

      <div className="mt-6 flex items-end gap-1">
        <span className="font-serif text-5xl leading-none">
          ₹{price.toLocaleString("en-IN")}
        </span>
        <span className={cn("mb-1 text-sm", featured ? "text-white/70" : "text-ink-3")}>
          {price === 0 ? "forever" : "/mo"}
        </span>
      </div>
      {annual && price > 0 && (
        <div className={cn("mt-1 text-xs", featured ? "text-white/60" : "text-ink-3")}>
          billed annually
        </div>
      )}

      <ul className="mt-7 flex-1 space-y-3.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                featured ? "bg-white/20 text-white" : "bg-primary-light text-primary",
              )}
            >
              <Check className="h-3 w-3" />
            </span>
            <span
              className={cn(
                "text-sm leading-relaxed",
                featured ? "text-white/90" : "text-ink-2",
              )}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Button
        href={whatsappLink(waMessage)}
        variant={featured ? "white" : "dark"}
        size="md"
        className="mt-7 w-full"
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
}

export function PricingCards() {
  const [annual, setAnnual] = useState(true);
  return (
    <div>
      <div className="flex justify-center">
        <BillingToggle annual={annual} setAnnual={setAnnual} />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} annual={annual} />
        ))}
      </div>
    </div>
  );
}
