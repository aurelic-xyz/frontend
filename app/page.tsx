import { ConnectionErrorBoundary } from "@/components/web3/ConnectionErrorBoundary";
import Navbar from "@/components/homepage/Navbar";
import HeroSection from "@/components/homepage/HeroSection";
import ProblemSection from "@/components/homepage/ProblemSection";
import SolutionSection from "@/components/homepage/SolutionSection";
import ArchitectureOverview from "@/components/homepage/ArchitectureOverview";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import UseCasesSection from "@/components/homepage/UseCasesSection";
import StatsSection from "@/components/homepage/StatsSection";
import CTASection from "@/components/homepage/CTASection";
import Footer from "@/components/homepage/Footer";

export default function HomePage() {
  return (
    <main id="main-content">
      <ConnectionErrorBoundary>
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ArchitectureOverview />
        <FeaturesSection />
        <UseCasesSection />
        <StatsSection />
        <CTASection />
        <Footer />
      </ConnectionErrorBoundary>
    </main>
  );
}
