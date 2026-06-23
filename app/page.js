import { TickerTape } from "@/components/home/TickerTape";
import { Hero } from "@/components/home/Hero";
import { MarketSnapshot } from "@/components/home/MarketSnapshot";
import { SnapshotSection } from "@/components/home/SnapshotSection";
import { DeskSection } from "@/components/home/DeskSection";
import { TelegramSection } from "@/components/home/TelegramSection";
import { StepsSection } from "@/components/home/StepsSection";
import { MediaCarousel } from "@/components/home/MediaCarousel";
import { Testimonials } from "@/components/home/Testimonials";
import { PricingSection } from "@/components/home/PricingSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <TickerTape />
      <Hero />
      <MarketSnapshot />
      <SnapshotSection />
      <DeskSection />
      <TelegramSection />
      <StepsSection />
      <MediaCarousel />
      <Testimonials />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
