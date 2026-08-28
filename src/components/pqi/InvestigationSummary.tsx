import { Info } from "lucide-react";
import { RiskBadge } from "./badges";
import type { DeviationAgentInput } from "@/lib/ai-agents";
import type { Risk } from "@/lib/mock-data";

function Card({ title, children }: { title: string; children: React.ReactNode }) { return <div className="surface-card p-5"><h3 className="text-sm font-semibold tracking-tight">{title}</h3><div className="mt-3 space-y-2 text-sm text-muted-foreground">{children}</div></div>; }
function Chip({ label, note }: { label: string; note?: string }) { return <div className="flex flex-wrap items-baseline gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2"><span className="font-mono text-xs font-semibold text-foreground">{label}</span>{note ? <span className="text-xs">{note}</span> : null}</div>; }
const display = (value?: string) => value?.trim() || "Not specified";
function deriveRootCause(input: DeviationAgentInput) { const notes = input.investigationNotes?.trim(); if (notes) return notes; if (input.description.trim()) return `Requires investigation based on: ${input.description.trim()}`; return "No root-cause evidence has been provided yet."; }

export function InvestigationSummary({ risk, input }: { risk?: Risk; input: DeviationAgentInput }) {
  const deviationId = display(input.deviationId);
  const description = display(input.description);
  const batch = display(input.batch);
  const area = display(input.area);
  const equipment = display(input.equipment);
  const notes = input.investigationNotes?.trim();

  const actions = [
    `Confirm evidence for ${deviationId}.`,
    `Assess the impact of ${description}.`,
    `Review records associated with ${batch}.`,
    `Review history and status for ${area}.`,
    `Review history and status for ${equipment}.`,
    "Have authorized QA personnel review the final findings.",
  ];

  return <section className="rise-in space-y-4">
    <div className="surface-card p-6"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-lg font-semibold tracking-tight">Investigation Summary</h2>{risk ? <div className="flex items-center gap-2 text-sm"><span className="text-muted-foreground">Risk</span><RiskBadge risk={risk} /></div> : null}</div><div className="mt-4 rounded-lg border border-warning/30 bg-warning-soft px-4 py-3"><p className="text-xs font-medium tracking-wide text-warning-foreground uppercase">Current Investigation Context</p><p className="mt-1 text-sm font-medium text-foreground">{deriveRootCause(input)}</p></div><p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground"><Info className="mt-0.5 size-3.5 shrink-0" />Values below are generated from the current user input and update when the deviation details change.</p></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card title="Current Deviation"><Chip label={deviationId} note={description} /></Card>
      <Card title="Current Batch"><Chip label={batch} note="Batch under assessment" /></Card>
      <Card title="Current Area"><Chip label={area} note="Area under assessment" /></Card>
      <Card title="Current Equipment"><Chip label={equipment} note="Equipment under assessment" /></Card>
      <Card title="Investigation Notes"><Chip label={notes || "No notes provided"} /></Card>
      <Card title="Potential Impact"><Chip label="To be assessed" note={`Assess impact for ${batch} in ${area} using ${equipment}.`} /></Card>
      <Card title="Recommended Next Steps"><ol className="space-y-2">{actions.map((action, index) => <li key={action} className="flex gap-2.5"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-info-soft font-mono text-[10px] font-semibold text-primary">{index + 1}</span><span className="text-sm">{action}</span></li>)}</ol></Card>
    </div>
  </section>;
}
