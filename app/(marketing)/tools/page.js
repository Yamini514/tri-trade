import { PageHeader } from "@/components/shared/PageHeader";
import { Calculators } from "@/components/tools/Calculators";

export const metadata = {
  title: "Tools — HeyFund",
  description: "Free trading calculators: position size, stop-loss, brokerage, margin, and options payoff.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        label="Trading Tools"
        title="Plan the trade before you take it."
        subtitle="Five calculators to size positions, set stops, estimate costs, and model option payoffs — so risk is decided in advance, not in the heat of the moment."
      />

      <section className="bg-background py-12 md:py-16">
        <div className="container-wide">
          <Calculators />
        </div>
      </section>
    </>
  );
}
