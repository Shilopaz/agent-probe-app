import { Tv, Wrench, Snowflake, Zap, Armchair, Plug } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    icon: Tv,
    title: "תליית טלוויזיה",
    description: "התקנה מקצועית על הקיר"
  },
  {
    icon: Wrench,
    title: "אינסטלציה",
    description: "תיקון נזילות וסתימות"
  },
  {
    icon: Snowflake,
    title: "התקנת מזגן",
    description: "התקנה ותחזוקה"
  },
  {
    icon: Zap,
    title: "עבודות חשמל",
    description: "תיקונים והתקנות"
  },
  {
    icon: Armchair,
    title: "הרכבת רהיטים",
    description: "הרכבה מקצועית ומהירה"
  },
  {
    icon: Plug,
    title: "מכשירי חשמל",
    description: "התקנה ותיקון"
  }
];

const CategoriesGrid = () => {
  return (
    <section id="categories" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          שירותים פופולריים
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          בעלי מקצוע מומחים בכל תחום
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Card 
              key={category.title} 
              className="cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <category.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
