import { MessageSquare, Zap, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: MessageSquare,
    title: "ספר לנו מה אתה צריך",
    description: "הבינה המלאכותית שלנו מבינה את הבעיה מיד",
    step: 1
  },
  {
    icon: Zap,
    title: "קבל הצעת מחיר מיידית",
    description: "מבוסס על נתוני שוק אמיתיים",
    step: 2
  },
  {
    icon: UserCheck,
    title: "הזמן בעל מקצוע מאומת",
    description: "התאמה לבעלי מקצוע אמינים ומנוסים",
    step: 3
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          איך זה עובד?
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          בשלושה צעדים פשוטים תקבל בעל מקצוע איכותי לעבודה שלך
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card key={step.step} className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
