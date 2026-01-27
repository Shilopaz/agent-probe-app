import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CreditCard, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'pending' | 'accepted' | 'completed';
  jobValue: number;
};

const mockJobs: Job[] = [
  {
    id: "1",
    title: "תיקון ברז מטפטף",
    description: "הברז במטבח מטפטף כבר שבוע",
    location: "תל אביב, רמת אביב",
    status: 'pending',
    jobValue: 100,
  },
  {
    id: "2",
    title: "הרכבת ארון PAX",
    description: "ארון PAX 3 דלתות חדש מאיקאה",
    location: "רמת גן, מרכז",
    status: 'accepted',
    jobValue: 350,
  },
  {
    id: "3",
    title: "התקנת מזגן",
    description: "מזגן עילי 1.5 כ״ס בחדר שינה",
    location: "הרצליה, פיתוח",
    status: 'completed',
    jobValue: 450,
  },
];

const getStatusBadge = (status: Job['status']) => {
  switch (status) {
    case 'pending':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">ממתין לאישור</Badge>;
    case 'accepted':
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">בביצוע</Badge>;
    case 'completed':
      return <Badge variant="secondary" className="bg-green-100 text-green-800">הושלם</Badge>;
  }
};

const ProDashboard = () => {
  const platformFeePercent = 0.1;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה לאתר
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">לוח בקרה לבעלי מקצוע</h1>
          </div>
          <Link to="/revenue">
            <Button variant="outline" size="sm">סקירת הכנסות</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">עבודות ממתינות</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">הושלמו החודש</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">הכנסות החודש</p>
                <p className="text-2xl font-bold">₪8,100</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">דירוג</p>
                <p className="text-2xl font-bold">4.9 ⭐</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pro Benefits */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">גישה ישירה ללקוחות</h3>
                <p className="text-sm text-muted-foreground">קבל את פרטי הלקוח ישירות אחרי אישור העבודה</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex items-center gap-4">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">תשלומים אוטומטיים</h3>
                <p className="text-sm text-muted-foreground">הכסף מועבר אליך אוטומטית בסיום העבודה</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <Card>
          <CardHeader>
            <CardTitle>עבודות נכנסות</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mockJobs.map((job) => {
                const platformFee = job.jobValue * platformFeePercent;
                const netPayout = job.jobValue - platformFee;

                return (
                  <div key={job.id} className="p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          {getStatusBadge(job.status)}
                        </div>
                        <p className="text-muted-foreground text-sm mb-1">{job.description}</p>
                        <p className="text-muted-foreground text-sm">📍 {job.location}</p>
                      </div>
                    </div>

                    {/* Payout Breakdown */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">שווי העבודה</span>
                        <span className="font-medium">₪{job.jobValue}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">עמלת פלטפורמה (10%)</span>
                        <span className="font-medium text-destructive">-₪{platformFee}</span>
                      </div>
                      <div className="border-t border-border pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">התשלום נטו שלך</span>
                          <span className="font-bold text-lg text-green-600">₪{netPayout}</span>
                        </div>
                      </div>
                    </div>

                    {job.status === 'pending' && (
                      <div className="flex gap-3 mt-4">
                        <Button className="flex-1">קבל עבודה</Button>
                        <Button variant="outline" className="flex-1">דחה</Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProDashboard;
