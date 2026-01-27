import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 grid grid-cols-3 items-center">
        {/* CTA Buttons - Left side in RTL */}
        <div className="flex items-center gap-3 justify-self-start">
          <Button variant="outline" size="sm">
            הירשם
          </Button>
          <Button size="sm">
            הפוך לבעל מקצוע
          </Button>
        </div>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center gap-8 justify-self-center">
          <button 
            onClick={() => scrollToSection('ai-quote')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            קבל הצעת מחיר
          </button>
          <button 
            onClick={() => scrollToSection('categories')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            קטגוריות
          </button>
        </div>

        {/* Logo - Right side in RTL */}
        <div className="flex items-center gap-2 justify-self-end">
          <span className="text-2xl font-bold text-primary">2Tusk</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
