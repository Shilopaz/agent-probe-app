import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const profileSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'שם פרטי הוא שדה חובה' }),
  lastName: z.string().trim().min(1, { message: 'שם משפחה הוא שדה חובה' }),
  email: z.string().trim().email({ message: 'כתובת מייל לא תקינה' }),
  city: z.string().trim().min(1, { message: 'עיר היא שדה חובה' }),
  street: z.string().trim().min(1, { message: 'רחוב הוא שדה חובה' }),
  houseNumber: z.string().trim().min(1, { message: 'מספר בית הוא שדה חובה' }),
  floor: z.string().trim().min(1, { message: 'קומה היא שדה חובה' }),
  apartment: z.string().trim().min(1, { message: 'מספר דירה הוא שדה חובה' }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const CreateProfile = () => {
  const navigate = useNavigate();
  const { setProfile, login } = useAuth();
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      street: '',
      houseNumber: '',
      floor: '',
      apartment: '',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    setProfile(data as { firstName: string; lastName: string; email: string; city: string; street: string; houseNumber: string; floor: string; apartment: string });
    login('phone');
    toast({
      title: 'ההרשמה הושלמה בהצלחה!',
      description: 'ברוך הבא ל-2Tusk',
    });
    navigate('/lobby');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">יצירת פרופיל</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם פרטי</FormLabel>
                      <FormControl>
                        <Input placeholder="ישראל" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם משפחה</FormLabel>
                      <FormControl>
                        <Input placeholder="ישראלי" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>מייל</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" dir="ltr" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>עיר</FormLabel>
                    <FormControl>
                      <Input placeholder="תל אביב" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>רחוב</FormLabel>
                    <FormControl>
                      <Input placeholder="רוטשילד" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="houseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מספר בית</FormLabel>
                      <FormControl>
                        <Input placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>קומה</FormLabel>
                      <FormControl>
                        <Input placeholder="3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apartment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>דירה</FormLabel>
                      <FormControl>
                        <Input placeholder="12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                סיים הרשמה
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProfile;
