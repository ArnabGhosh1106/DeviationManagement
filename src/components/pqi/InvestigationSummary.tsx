import { Info } from "lucide-react";
import { RiskBadge } from "./badges";
import type { Risk } from "@/lib/mock-data";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface-card p-5">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function Chip({ label, note }: { label: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2">
      <span className="font-mono text-xs font-semibold text-foreground">{label}</span>
      {note ? <span className="text-xs">{note}</span> : null}
    </div>
  );
}

export function InvestigationSummary({ risk = "High" as Risk }: { risk?: Risk }) {
  return (
    <section className="rise-in space-y-4">
      <div className="surface-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Investigation Summary</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Risk</span>
            <RiskBadge risk={risk} />
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-warning/30 bg-warning-soft px-4 py-3">
          <p className="text-xs font-medium tracking-wide text-warning-foreground uppercase">
            Potential Root Cause
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            Potential temperature sensor calibration issue
          </p>
        </div>
        <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          AI-generated assessment. Final classification and disposition require QA review.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Similar Historical Deviations">
          <Chip label="DEV-0982" note="Temperature excursion — Reactor R-102" />
          <Chip label="DEV-0917" note="Sensor drift — Reactor R-102" />
          <Chip label="DEV-0872" note="Jacket control loop instability" />
        </Card>

        <Card title="Potentially Affected SOPs">
          <Chip label="SOP-102" note="Reactor Temperature Monitoring" />
          <Chip label="SOP-115" note="Batch Processing Procedure" />
        </Card>

        <Card title="Affected Equipment">
          <Chip label="Reactor R-102" note="Manufacturing Area 3" />
        </Card>

        <Card title="Potential Batch Impact">
          <Chip label="B12345" note="Requires QA assessment" />
        </Card>

        <Card title="Existing CAPAs">
          <Chip label="CAPA-2041" note="Temperature monitoring improvement" />
        </Card>

        <Card title="Recommended Actions">
          <ol className="space-y-2">
            {[
              "Review temperature sensor calibration history.",
              "Assess potential batch impact.",
              "Review related maintenance records.",
              "Evaluate existing CAPA effectiveness.",
            ].map((a, i) => (
              <li key={a} className="flex gap-2.5">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-info-soft font-mono text-[10px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm">{a}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </section>
  );
}
