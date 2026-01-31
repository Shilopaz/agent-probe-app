import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { User, Tv, Wrench, Snowflake, Zap, Armchair, Plug, ArrowLeft } from 'lucide-react';

const quickCategories = [
  { icon: Tv, label: "תליית טלוויזיה", prompt: "אני צריך לתלות טלוויזיה על הקיר" },
  { icon: Wrench, label: "אינסטלציה", prompt: "יש לי בעיית אינסטלציה" },
  { icon: Snowflake, label: "התקנת מזגן", prompt: "אני צריך להתקין מזגן" },
  { icon: Zap, label: "חשמל", prompt: "יש לי בעיית חשמל" },
  { icon: Armchair, label: "הרכבת רהיטים", prompt: "אני צריך להרכיב רהיטים" },
  { icon: Plug, label: "מכשירי חשמל", prompt: "אני צריך עזרה עם מכשיר חשמלי" },
];

const Lobby = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [problemDescription, setProblemDescription] = useState('');

  const displayName = profile?.firstName || 'משתמש';

  const handleStartQuote = () => {
    // Navigate to quote flow with the description
    console.log('Starting quote with:', problemDescription);
    // TODO: Navigate to AI quote flow with problemDescription
  };

  const handleCategoryClick = (prompt: string) => {
    // Auto-fill and start quote
    console.log('Starting quote with category:', prompt);
    // TODO: Navigate to AI quote flow with prompt
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo - Left side (appears on right in RTL) */}
          <span className="text-2xl font-bold text-primary">2Tusk</span>
          
          {/* Profile - Right side (appears on left in RTL) */}
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <User className="h-5 w-5 text-primary" />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-12 md:py-20 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            שלום {displayName}, במה אפשר לעזור היום?
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            תאר את הבעיה וקבל הצעת מחיר מיידית
          </p>

          {/* Main Input Box */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Textarea
                placeholder="תאר את הבעיה שלך..."
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="min-h-[120px] text-lg resize-none border-0 focus-visible:ring-0 p-0 mb-4"
              />
              {problemDescription.trim() && (
                <Button 
                  size="lg" 
                  className="w-full md:w-auto gap-2"
                  onClick={handleStartQuote}
                >
                  קבל הצעת מחיר
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Quick Categories */}
        <section className="pb-12 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-center text-muted-foreground">
            או בחר קטגוריה
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickCategories.map((category) => (
              <button
                key={category.label}
                onClick={() => handleCategoryClick(category.prompt)}
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-accent transition-all text-right"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Footer Links */}
        <section className="pb-12 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">
              הפוך לבעל מקצוע
            </Link>
            <span className="text-border">|</span>
            <Link to="#" className="hover:text-foreground transition-colors">
              מרכז תמיכה
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Lobby;
