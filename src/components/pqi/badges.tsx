import { cn } from "@/lib/utils";
import type { Risk } from "@/lib/mock-data";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";

const riskStyles: Record<Risk, string> = {
  Low: "bg-neutral-soft text-muted-foreground border-border",
  Medium: "bg-warning-soft text-warning-foreground border-warning/30",
  High: "bg-danger-soft text-danger border-danger/30",
  Critical: "bg-danger text-danger-foreground border-danger",
};

export function RiskBadge({ risk }: { risk: Risk }) {
  return (
    <span className={cn(base, riskStyles[risk])}>
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {risk}
    </span>
  );
}

const statusStyles: Record<string, string> = {
  Open: "bg-neutral-soft text-muted-foreground border-border",
  Draft: "bg-neutral-soft text-muted-foreground border-border",
  Pending: "bg-neutral-soft text-muted-foreground border-border",
  "Under Investigation": "bg-info-soft text-primary border-primary/25",
  "Impact Assessment": "bg-info-soft text-primary border-primary/25",
  Running: "bg-info-soft text-primary border-primary/25",
  "AI Review": "bg-accent text-accent-foreground border-primary/20",
  "QA Review": "bg-warning-soft text-warning-foreground border-warning/30",
  Closed: "bg-success-soft text-success border-success/30",
  Completed: "bg-success-soft text-success border-success/30",
  Approved: "bg-success-soft text-success border-success/30",
  Implemented: "bg-success-soft text-success border-success/30",
  Failed: "bg-danger-soft text-danger border-danger/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(base, statusStyles[status] ?? statusStyles["Open"])}>{status}</span>
  );
}
