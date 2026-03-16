import HeroFull from "@/components/sections/HeroFull";
import StatsBanner from "@/components/sections/StatsBanner";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import TrustBlock from "@/components/sections/TrustBlock";
import ProcessSteps from "@/components/sections/ProcessSteps";
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
        <ServicesOverview />
        <ProjectsPreview />
        <TrustBlock />
        <ProcessSteps />
        <CTASection sourcePage="homepage" />
      </main>
      <Footer />
    </>
  );
}
