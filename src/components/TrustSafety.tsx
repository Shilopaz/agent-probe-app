import { ShieldCheck, CreditCard, Lock, Headphones } from "lucide-react";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "בעלי מקצוע מאומתים",
    description: "כל בעל מקצוע עובר תהליך אימות קפדני"
  },
  {
    icon: CreditCard,
    title: "תשלום רק לאחר סיום העבודה",
    description: "משלמים רק כשאתם מרוצים מהתוצאה"
  },
  {
    icon: Lock,
    title: "הצפנה מאובטחת",
    description: "כל המידע שלכם מוגן בהצפנה מתקדמת"
  },
  {
    icon: Headphones,
    title: "תמיכה מלאה",
    description: "צוות התמיכה שלנו זמין עבורכם"
  }
];

const TrustSafety = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          למה אלפים סומכים עלינו לשירותי בית
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          אנחנו מחויבים לספק לכם שירות בטוח ואמין
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point) => (
            <div 
              key={point.title}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <point.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSafety;
