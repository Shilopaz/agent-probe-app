import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProSummary = {
  totalPrice: string;
  problemTitle: string;
  professionalExplanation: string;
};

type ProSummaryPanelProps = {
  summary: ProSummary | null;
  isOpen: boolean;
  onClose: () => void;
};

const ProSummaryPanel = ({ summary, isOpen, onClose }: ProSummaryPanelProps) => {
  if (!summary) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">סיכום לבעל מקצוע</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Total Price */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
            <div className="text-sm text-muted-foreground mb-1">מחיר כולל</div>
            <div className="text-3xl font-bold text-primary">{summary.totalPrice}</div>
          </div>

          {/* Problem Title */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">כותרת הבעיה</div>
            <div className="text-lg font-semibold text-foreground">{summary.problemTitle}</div>
          </div>

          {/* Professional Explanation */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">הסבר מקצועי</div>
            <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed bg-muted/50 rounded-xl p-4 border border-border">
              {summary.professionalExplanation}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProSummaryPanel;
