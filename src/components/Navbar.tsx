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
        {/* CTA Buttons - Left side in RTL */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            הירשם
          </Button>
          <Button size="sm">
            הפוך לבעל מקצוע
          </Button>
        </div>

        {/* Logo - Right side in RTL */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">2Tusk</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
