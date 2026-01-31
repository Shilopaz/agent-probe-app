import AIChat from "@/components/AIChat";

const AIQuoteSection = () => {
  return (
    <section id="ai-quote" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          קבל הצעת מחיר מיידית
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          תאר את העבודה שצריך לעשות והבינה המלאכותית תחשב לך מחיר בזמן אמת
        </p>

        <AIChat />
      </div>
    </section>
  );
};

export default AIQuoteSection;
