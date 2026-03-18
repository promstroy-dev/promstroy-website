import HeroFull from "@/components/sections/HeroFull";
import StatsBanner from "@/components/sections/StatsBanner";
import TrustMarquee from "@/components/sections/TrustMarquee";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import TrustBlock from "@/components/sections/TrustBlock";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <StickyHeader />
      <main>
        <HeroFull />
        <StatsBanner />
        <TrustMarquee />
        <ServicesOverview />
        <ProjectsPreview />
        <TrustBlock />
        <ProcessSteps />
        <FAQSection />
        <CTASection sourcePage="homepage" />
      </main>
      <Footer />
    </>
  );
}
