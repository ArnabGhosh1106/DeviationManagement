import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  tone?: "default" | "danger" | "info" | "success" | "warning";
}) {
  const tones: Record<string, string> = {
    default: "bg-neutral-soft text-muted-foreground",
    danger: "bg-danger-soft text-danger",
    info: "bg-info-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
  };

  return (
    <div className="surface-card rise-in p-5 transition-shadow hover:shadow-[var(--shadow-raised)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        {Icon ? (
          <span className={cn("grid size-8 place-items-center rounded-lg", tones[tone])}>
            <Icon className="size-4" />
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
