import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/contexts/AuthContext';

const OTPLogin = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { phoneNumber, login, setProfile } = useAuth();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      // Mock login - set a default profile for returning user
      setProfile({
        firstName: 'משתמש',
        lastName: 'קיים',
        email: 'user@example.com',
        city: 'תל אביב',
        street: 'רוטשילד',
        houseNumber: '1',
        floor: '1',
        apartment: '1',
      });
      login('phone');
      navigate('/lobby');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">הזן את הקוד שנשלח אליך</CardTitle>
          <CardDescription>
            שלחנו קוד אימות למספר {phoneNumber || 'הטלפון שלך'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center" dir="ltr">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="rounded-md border" />
                  <InputOTPSlot index={1} className="rounded-md border" />
                  <InputOTPSlot index={2} className="rounded-md border" />
                  <InputOTPSlot index={3} className="rounded-md border" />
                  <InputOTPSlot index={4} className="rounded-md border" />
                  <InputOTPSlot index={5} className="rounded-md border" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={otp.length !== 6}
            >
              התחבר
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              לא קיבלת קוד?{' '}
              <button type="button" className="text-primary hover:underline">
                שלח שוב
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPLogin;
