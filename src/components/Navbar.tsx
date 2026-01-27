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
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Right side in RTL */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">2Tusk</span>
        </div>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            איך זה עובד
          </button>
          <button 
            onClick={() => scrollToSection('categories')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            קטגוריות
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            מחירים
          </button>
        </div>

        {/* CTA Buttons - Left side in RTL */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            הירשם
          </Button>
          <Button size="sm">
            הפוך לבעל מקצוע
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
