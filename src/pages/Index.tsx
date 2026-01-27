import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AIQuoteSection from "@/components/AIQuoteSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import TrustSafety from "@/components/TrustSafety";
import PricingDemo from "@/components/PricingDemo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AIQuoteSection />
        <CategoriesGrid />
        <TrustSafety />
        <PricingDemo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
