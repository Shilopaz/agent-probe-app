import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, MessageSquareOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [problem, setProblem] = useState("");
  const [showQuote, setShowQuote] = useState(false);

  const handleGetQuote = () => {
    if (problem.trim()) {
      setShowQuote(true);
    }
  };

  const basePrice = 100;
  const serviceFee = basePrice * 0.1;
  const totalPrice = basePrice + serviceFee;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-foreground">2Tusk</h1>
          <div className="flex gap-4">
            <Link to="/pro-dashboard">
              <Button variant="ghost" size="sm">לוח בקרה לבעלי מקצוע</Button>
            </Link>
            <Link to="/revenue">
              <Button variant="outline" size="sm">סקירת הכנסות</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            קבל הצעת מחיר מיידית
            <br />
            <span className="text-primary">לכל עבודה בבית</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            תאר את הבעיה וקבל מחיר מיידי - בלי משא ומתן, בלי הפתעות
          </p>

          {/* Input Field */}
          <div className="flex gap-3 max-w-xl mx-auto">
            <Input
              placeholder="מה צריך לתקן? (לדוגמה: הברז במטבח מטפטף)"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="text-right text-lg py-6"
              onKeyPress={(e) => e.key === 'Enter' && handleGetQuote()}
            />
            <Button 
              onClick={handleGetQuote}
              size="lg"
              className="px-8"
              disabled={!problem.trim()}
            >
              קבל מחיר
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* AI Quote Section */}
      {showQuote && (
        <section className="container mx-auto px-4 pb-16">
          <Card className="max-w-md mx-auto border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-primary/5 border-b border-border">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Zap className="h-5 w-5 text-primary" />
                הצעת מחיר מיידית
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                "{problem}"
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">מחיר בסיס</span>
                  <span className="font-medium">₪{basePrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">עמלת שירות, אמון ותמיכה (10%)</span>
                  <span className="font-medium">₪{serviceFee}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">סה"כ לתשלום</span>
                    <span className="font-bold text-2xl text-primary">₪{totalPrice}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4" size="lg">
                הזמן עכשיו
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Value Props */}
      <section className="bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">מחיר מיידי</h3>
              <p className="text-muted-foreground text-sm">
                קבל הצעת מחיר תוך שניות - בלי לחכות להחזרות
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">בעלי מקצוע מאומתים</h3>
              <p className="text-muted-foreground text-sm">
                כל בעל מקצוע עובר בדיקת רקע ואימות מקצועי
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MessageSquareOff className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">בלי משא ומתן</h3>
              <p className="text-muted-foreground text-sm">
                המחיר שתקבל הוא המחיר הסופי - שקיפות מלאה
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2025 2Tusk. כל הזכויות שמורות.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
