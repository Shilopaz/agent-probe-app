type ProSummary = {
  totalPrice: string;
  problemTitle: string;
  professionalExplanation: string;
};

type ProSummaryPanelProps = {
  summary: ProSummary | null;
};

const ProSummaryPanel = ({ summary }: ProSummaryPanelProps) => {
  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border bg-muted/50">
        <h2 className="text-lg font-semibold text-foreground">סיכום לבעל מקצוע</h2>
        <p className="text-xs text-muted-foreground">Pro Summary</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {!summary ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm text-center">
            <p>הסיכום יופיע כאן<br />לאחר קבלת הצעת מחיר</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Total Price */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">מחיר כולל</div>
              <div className="text-2xl font-bold text-primary">{summary.totalPrice}</div>
            </div>

            {/* Problem Title */}
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">כותרת הבעיה</div>
              <div className="text-base font-medium text-foreground">{summary.problemTitle}</div>
            </div>

            {/* Professional Explanation */}
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">הסבר מקצועי</div>
              <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed bg-muted/50 rounded-lg p-3">
                {summary.professionalExplanation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProSummaryPanel;
