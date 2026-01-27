import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, MapPin, Mail } from 'lucide-react';

const Lobby = () => {
  const navigate = useNavigate();
  const { profile, logout, loginMethod } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = profile?.firstName 
    ? `${profile.firstName} ${profile.lastName || ''}`.trim()
    : 'משתמש';

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 ml-2" />
            התנתק
          </Button>
          <span className="text-2xl font-bold text-primary">2Tusk</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">שלום, {displayName}! 👋</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                ברוך הבא ל-2Tusk. כאן תוכל להזמין בעלי מקצוע לכל עבודה בבית.
              </p>
            </CardContent>
          </Card>

          {profile && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  פרטי הפרופיל
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">שם מלא:</span>
                    <p className="font-medium">{displayName}</p>
                  </div>
                  {profile.email && (
                    <div>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        מייל:
                      </span>
                      <p className="font-medium" dir="ltr">{profile.email}</p>
                    </div>
                  )}
                </div>

                {profile.city && (
                  <div>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      כתובת:
                    </span>
                    <p className="font-medium">
                      {profile.street} {profile.houseNumber}, 
                      {profile.apartment && ` דירה ${profile.apartment},`}
                      {profile.floor && ` קומה ${profile.floor},`}
                      {' '}{profile.city}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-muted-foreground">אופן התחברות:</span>
                  <p className="font-medium">
                    {loginMethod === 'google' ? 'Google' : 
                     loginMethod === 'apple' ? 'Apple' : 'טלפון'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">מוכן להזמין בעל מקצוע?</h3>
                <p className="text-muted-foreground mb-4">
                  תאר את הבעיה וקבל הצעת מחיר מיידית
                </p>
                <Button size="lg" onClick={() => navigate('/')}>
                  קבל הצעת מחיר
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Lobby;
