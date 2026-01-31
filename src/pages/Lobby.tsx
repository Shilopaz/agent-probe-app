import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, Hammer, Plug, Truck, Sparkles, Key, Armchair } from 'lucide-react';
import AIChat from '@/components/AIChat';

const quickCategories = [
  { icon: Hammer, label: "הנדימן", prompt: "אני צריך שירותי הנדימן" },
  { icon: Plug, label: "חיבור מכשירי חשמל", prompt: "אני צריך לחבר מכשיר חשמלי" },
  { icon: Truck, label: "הובלות קטנות", prompt: "אני צריך הובלה קטנה" },
  { icon: Sparkles, label: "ניקיון וסדר", prompt: "אני צריך שירותי ניקיון וסדר" },
  { icon: Key, label: "מנעולן", prompt: "אני צריך מנעולן" },
  { icon: Armchair, label: "הרכבת רהיטים", prompt: "אני צריך להרכיב רהיטים" },
];

const Lobby = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [selectedPrompt, setSelectedPrompt] = useState<string | undefined>(undefined);
  const [autoSend, setAutoSend] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const displayName = profile?.firstName || 'משתמש';

  const handleCategoryClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setAutoSend(true);
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewChat = () => {
    setSelectedPrompt(undefined);
    setAutoSend(false);
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
        <section className="py-8 md:py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            שלום {displayName}, במה אפשר לעזור היום?
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            תאר את הבעיה וקבל הצעת מחיר מיידית
          </p>
        </section>

        {/* AI Chat Component */}
        <section className="pb-8" ref={chatRef}>
          <AIChat 
            initialMessage={selectedPrompt} 
            onNewChat={handleNewChat}
            autoSend={autoSend}
          />
        </section>

        {/* Quick Categories */}
        <section className="pb-8 max-w-2xl mx-auto">
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
