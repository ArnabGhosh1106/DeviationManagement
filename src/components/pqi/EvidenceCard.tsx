import { FileText, Wrench, History } from "lucide-react";

const EVIDENCE = [
  {
    icon: History,
    label: "Historical Deviation DEV-0982",
    text: "Similar temperature excursion involving Reactor R-102.",
    source: "Deviation register",
  },
  {
    icon: FileText,
    label: "SOP-102",
    text: "Defines acceptable reactor temperature operating range.",
    source: "Document management",
  },
  {
    icon: Wrench,
    label: "Maintenance Record MR-2041",
    text: "Temperature sensor calibration activity recorded before the deviation.",
    source: "Maintenance system",
  },
];

export function EvidenceCard() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">AI Evidence & Traceability</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each conclusion is linked to the record it was derived from.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {EVIDENCE.map((e) => (
          <article key={e.label} className="surface-card p-5">
            <span className="grid size-9 place-items-center rounded-lg bg-info-soft text-primary">
              <e.icon className="size-4" />
            </span>
            <h3 className="mt-3 text-sm font-semibold tracking-tight">{e.label}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{e.text}</p>
            <p className="mt-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              {e.source}
            </p>
          </article>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        AI conclusions are based on available records.
      </p>
    </section>
  );
}
