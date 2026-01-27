import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AIQuoteSection from "@/components/AIQuoteSection";
import CategoriesGrid from "@/components/CategoriesGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AIQuoteSection />
        <CategoriesGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
