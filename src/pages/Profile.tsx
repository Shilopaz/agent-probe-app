import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, User, MapPin, Mail, Phone, LogOut, Trash2, CreditCard, History } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { profile, phoneNumber, logout, setProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    logout();
    toast({
      title: "החשבון נמחק",
      description: "החשבון שלך נמחק בהצלחה",
    });
    navigate('/');
  };

  const handleSaveProfile = () => {
    if (editedProfile) {
      setProfile(editedProfile);
      setIsEditing(false);
      toast({
        title: "הפרטים נשמרו",
        description: "פרטי הפרופיל עודכנו בהצלחה",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (editedProfile) {
      setEditedProfile({ ...editedProfile, [field]: value });
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/lobby')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
            <span>חזרה</span>
          </button>
          <span className="text-2xl font-bold text-primary">2Tusk</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">
              {profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}`.trim() : 'המשתמש שלי'}
            </h1>
            {phoneNumber && (
              <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <Phone className="h-4 w-4" />
                <span dir="ltr">{phoneNumber}</span>
              </p>
            )}
          </div>

          {/* Personal Details Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  פרטים אישיים
                </CardTitle>
                <CardDescription>ערוך את הפרטים האישיים שלך</CardDescription>
              </div>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  ערוך
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setIsEditing(false);
                    setEditedProfile(profile);
                  }}>
                    ביטול
                  </Button>
                  <Button size="sm" onClick={handleSaveProfile}>
                    שמור
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>שם פרטי</Label>
                  {isEditing ? (
                    <Input 
                      value={editedProfile?.firstName || ''} 
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="הכנס שם פרטי"
                    />
                  ) : (
                    <p className="text-sm py-2">{profile?.firstName || '-'}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>שם משפחה</Label>
                  {isEditing ? (
                    <Input 
                      value={editedProfile?.lastName || ''} 
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="הכנס שם משפחה"
                    />
                  ) : (
                    <p className="text-sm py-2">{profile?.lastName || '-'}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  מייל
                </Label>
                {isEditing ? (
                  <Input 
                    type="email"
                    value={editedProfile?.email || ''} 
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="הכנס מייל"
                    dir="ltr"
                  />
                ) : (
                  <p className="text-sm py-2" dir="ltr">{profile?.email || '-'}</p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  כתובת
                </Label>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      value={editedProfile?.city || ''} 
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="הכנס עיר"
                    />
                    <Input 
                      value={editedProfile?.street || ''} 
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      placeholder="הכנס רחוב"
                    />
                    <Input 
                      value={editedProfile?.houseNumber || ''} 
                      onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                      placeholder="הכנס מספר בית"
                    />
                    <Input 
                      value={editedProfile?.floor || ''} 
                      onChange={(e) => handleInputChange('floor', e.target.value)}
                      placeholder="הכנס קומה"
                    />
                    <Input 
                      value={editedProfile?.apartment || ''} 
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      placeholder="הכנס דירה"
                    />
                  </div>
                ) : (
                  <p className="text-sm py-2">
                    {profile?.city ? (
                      <>
                        {profile.street} {profile.houseNumber}
                        {profile.apartment && `, דירה ${profile.apartment}`}
                        {profile.floor && `, קומה ${profile.floor}`}
                        {`, ${profile.city}`}
                      </>
                    ) : '-'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">הגדרות נוספות</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <CreditCard className="h-5 w-5" />
                אמצעי תשלום
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <History className="h-5 w-5" />
                היסטוריית הזמנות
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-lg">פעולות חשבון</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 h-12"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                התנתקות
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-5 w-5" />
                    מחיקת חשבון
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent dir="rtl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
                    <AlertDialogDescription>
                      פעולה זו תמחק את החשבון שלך לצמיתות. לא ניתן לבטל פעולה זו.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row-reverse gap-2">
                    <AlertDialogCancel>ביטול</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      מחק חשבון
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
