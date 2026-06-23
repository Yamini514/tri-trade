import { PageHeader } from "@/components/shared/PageHeader";
import { LearnTabs } from "@/components/learn/LearnTabs";

export const metadata = {
  title: "Learn — HeyFund",
  description: "Courses, candlestick patterns, trading strategies, and a full markets glossary.",
};

export default function LearnPage() {
  return (
    <>
      <PageHeader
        label="Learn"
        title="Build a real edge, one lesson at a time."
        subtitle="From your first candlestick to multi-leg options — structured courses, pattern references, strategies, and a plain-English glossary."
      />

      <section className="bg-background py-12 md:py-16">
        <div className="container-wide">
          <LearnTabs />
        </div>
      </section>
    </>
  );
}
