import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, TrendingUp, Users, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const RevenuePage = () => {
  const baseJobValue = 100;
  const userFeePercent = 10;
  const proFeePercent = 10;
  const totalPlatformPercent = userFeePercent + proFeePercent;

  const userFee = baseJobValue * (userFeePercent / 100);
  const proFee = baseJobValue * (proFeePercent / 100);
  const totalPlatformRevenue = userFee + proFee;

  const userPays = baseJobValue + userFee;
  const proReceives = baseJobValue - proFee;

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
            <h1 className="text-xl font-bold text-foreground">סקירת הכנסות הפלטפורמה</h1>
          </div>
          <Link to="/pro-dashboard">
            <Button variant="outline" size="sm">לוח בקרה לבעלי מקצוע</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Summary Card */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader className="bg-primary/5 border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              מודל העסקי - עמלה כפולה
            </CardTitle>
            <CardDescription>
              הפלטפורמה גובה עמלה משני הצדדים - מהלקוח ומבעל המקצוע
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <p className="text-muted-foreground mb-2">סה"כ הכנסות הפלטפורמה לכל עבודה</p>
              <p className="text-5xl font-bold text-primary">{totalPlatformPercent}%</p>
              <p className="text-lg text-muted-foreground mt-2">
                (₪{totalPlatformRevenue} על עבודה בשווי ₪{baseJobValue})
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-800 mb-1">עמלה מהלקוח</p>
                <p className="text-2xl font-bold text-blue-600">{userFeePercent}%</p>
                <p className="text-sm text-blue-700">₪{userFee}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Briefcase className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-800 mb-1">עמלה מבעל המקצוע</p>
                <p className="text-2xl font-bold text-green-600">{proFeePercent}%</p>
                <p className="text-sm text-green-700">₪{proFee}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Breakdown Table */}
        <Card>
          <CardHeader>
            <CardTitle>פירוט מלא לעבודה בשווי ₪{baseJobValue}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">צד</TableHead>
                  <TableHead className="text-right">פרטים</TableHead>
                  <TableHead className="text-left">סכום</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* User Side */}
                <TableRow className="bg-blue-50/50">
                  <TableCell className="font-medium" rowSpan={3}>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      הלקוח
                    </div>
                  </TableCell>
                  <TableCell>מחיר בסיס</TableCell>
                  <TableCell className="text-left">₪{baseJobValue}</TableCell>
                </TableRow>
                <TableRow className="bg-blue-50/50">
                  <TableCell>עמלת שירות ({userFeePercent}%)</TableCell>
                  <TableCell className="text-left">+ ₪{userFee}</TableCell>
                </TableRow>
                <TableRow className="bg-blue-50/50 font-semibold">
                  <TableCell>סה"כ לתשלום</TableCell>
                  <TableCell className="text-left text-blue-600">₪{userPays}</TableCell>
                </TableRow>

                {/* Pro Side */}
                <TableRow className="bg-green-50/50">
                  <TableCell className="font-medium" rowSpan={3}>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-green-600" />
                      בעל המקצוע
                    </div>
                  </TableCell>
                  <TableCell>שווי העבודה</TableCell>
                  <TableCell className="text-left">₪{baseJobValue}</TableCell>
                </TableRow>
                <TableRow className="bg-green-50/50">
                  <TableCell>עמלת פלטפורמה ({proFeePercent}%)</TableCell>
                  <TableCell className="text-left text-destructive">- ₪{proFee}</TableCell>
                </TableRow>
                <TableRow className="bg-green-50/50 font-semibold">
                  <TableCell>תשלום נטו</TableCell>
                  <TableCell className="text-left text-green-600">₪{proReceives}</TableCell>
                </TableRow>

                {/* Platform */}
                <TableRow className="bg-primary/5 font-bold">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      הפלטפורמה
                    </div>
                  </TableCell>
                  <TableCell>סה"כ הכנסות ({totalPlatformPercent}%)</TableCell>
                  <TableCell className="text-left text-primary text-lg">₪{totalPlatformRevenue}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Example Jobs */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>דוגמאות לעבודות שונות</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">סוג עבודה</TableHead>
                  <TableHead className="text-right">מחיר בסיס</TableHead>
                  <TableHead className="text-right">לקוח משלם</TableHead>
                  <TableHead className="text-right">בעל מקצוע מקבל</TableHead>
                  <TableHead className="text-right">הכנסות פלטפורמה</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "תיקון ברז", base: 100 },
                  { name: "הרכבת רהיט", base: 250 },
                  { name: "התקנת מזגן", base: 450 },
                  { name: "צביעת חדר", base: 800 },
                  { name: "שיפוץ חדר אמבטיה", base: 5000 },
                ].map((job) => (
                  <TableRow key={job.name}>
                    <TableCell className="font-medium">{job.name}</TableCell>
                    <TableCell>₪{job.base}</TableCell>
                    <TableCell className="text-blue-600">₪{job.base + job.base * 0.1}</TableCell>
                    <TableCell className="text-green-600">₪{job.base - job.base * 0.1}</TableCell>
                    <TableCell className="text-primary font-semibold">₪{job.base * 0.2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenuePage;
