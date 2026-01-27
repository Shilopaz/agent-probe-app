import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Briefcase, Building2 } from "lucide-react";

const PricingDemo = () => {
  const basePrice = 100;
  const serviceFee = basePrice * 0.1;
  const platformFee = basePrice * 0.1;
  const userTotal = basePrice + serviceFee;
  const proPayout = basePrice - platformFee;
  const platformRevenue = serviceFee + platformFee;

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          איך המחירים עובדים?
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          שקיפות מלאה - כולם מרוויחים
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* User Side */}
            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-accent flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">צד הלקוח</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">מחיר בסיס</span>
                  <span className="font-medium">₪{basePrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">עמלת שירות, אמון ונוחות (10%)</span>
                  <span className="font-medium">₪{serviceFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">סה"כ לתשלום</span>
                  <span className="font-bold text-primary">₪{userTotal}</span>
                </div>
              </CardContent>
            </Card>

            {/* Pro Side */}
            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-accent flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">צד בעל המקצוע</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">ערך העבודה</span>
                  <span className="font-medium">₪{basePrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">עמלת פלטפורמה (10%)</span>
                  <span className="font-medium text-destructive">-₪{platformFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">תשלום נטו</span>
                  <span className="font-bold text-primary">₪{proPayout}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Revenue */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-6">
              <div className="flex items-center justify-center gap-4">
                <Building2 className="h-8 w-8" />
                <div className="text-center">
                  <p className="text-sm opacity-90">הכנסת 2Tusk</p>
                  <p className="text-2xl font-bold">₪{platformRevenue}</p>
                  <p className="text-sm opacity-75">(20% לכל עבודה של ₪{basePrice})</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingDemo;
