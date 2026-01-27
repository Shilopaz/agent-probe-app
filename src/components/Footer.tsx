const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">2Tusk</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">שירותי בית מקצועיים</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} 2Tusk. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
