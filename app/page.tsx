import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { ThePath } from "@/components/ThePath";
import { Verticals } from "@/components/Verticals";
import { AmpaDifference } from "@/components/AmpaDifference";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { TalkToSarah } from "@/components/TalkToSarah";
import { FAQ } from "@/components/FAQ";
import { ApplyCTA } from "@/components/ApplyCTA";
import { StickyBar } from "@/components/StickyBar";
import { SiteFooter } from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pb-[80px]">
        <Hero />
        <Manifesto />
        <ThePath />
        <Verticals />
        <AmpaDifference />
        <Stats />
        <Testimonials />
        <TalkToSarah />
        <FAQ />
        <ApplyCTA />
      </main>
      <SiteFooter />
      <StickyBar />
    </>
  );
}
