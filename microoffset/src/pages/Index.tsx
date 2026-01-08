import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedPacksSection from "@/components/FeaturedPacksSection";
import ProblemSection from "@/components/ProblemSection";
import CertificateSection from "@/components/CertificateSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CDRProjectsSection from "@/components/CDRProjectsSection";
import MeasurementSection from "@/components/MeasurementSection";
import EmittersSection from "@/components/EmittersSection";
import ProjectsSection from "@/components/ProjectsSection";
import AudienceSection from "@/components/AudienceSection";
import WhyDifferentSection from "@/components/WhyDifferentSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPacksSection />
        <ProblemSection />
        <CertificateSection />
        <HowItWorksSection />
        <CDRProjectsSection />
        <MeasurementSection />
        <EmittersSection />
        <ProjectsSection />
        <AudienceSection />
        <WhyDifferentSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;