import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToQuote = () => {
    const element = document.getElementById('ai-quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
          בעל מקצוע לכל עבודה בבית.
          <br />
          <span className="text-primary">מהיר, אמין, ובמחיר מיידי</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          תאר את הבעיה, קבל הצעת מחיר מיידית מהבינה המלאכותית שלנו, והזמן בעל מקצוע מאומת תוך דקות
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button size="lg" className="text-lg px-8" onClick={scrollToQuote}>
            הירשם
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            הפוך לבעל מקצוע
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          ללא התחייבות. לוקח פחות מדקה
        </p>

        <button 
          onClick={scrollToQuote}
          className="mt-12 animate-bounce text-primary hover:text-primary/80 transition-colors"
          aria-label="גלול למטה"
        >
          <ArrowDown className="h-8 w-8 mx-auto" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
