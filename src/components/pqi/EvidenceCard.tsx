import { FileText, History, NotebookPen } from "lucide-react";
import type { DeviationAgentInput } from "@/lib/ai-agents";

const display = (value?: string) => value?.trim() || "Not specified";

export function EvidenceCard({ input }: { input: DeviationAgentInput }) {
  const deviationId = display(input.deviationId);
  const description = display(input.description);
  const batch = display(input.batch);
  const equipment = display(input.equipment);
  const notes = input.investigationNotes?.trim();

  const evidence = [
    {
      icon: FileText,
      label: `Current Deviation ${deviationId}`,
      text: description,
      source: "Current user input",
    },
    {
      icon: History,
      label: `Batch ${batch}`,
      text: `Current assessment is scoped to the entered batch and equipment: ${equipment}.`,
      source: "Current user input",
    },
    {
      icon: NotebookPen,
      label: "Investigation Notes",
      text: notes || "No investigation notes have been provided yet.",
      source: "Current user input",
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">AI Evidence & Traceability</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The evidence shown here is tied to the current deviation values rather than a fixed sample record.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {evidence.map((evidenceItem) => {
          const Icon = evidenceItem.icon;
          return (
            <article key={evidenceItem.label} className="surface-card p-5">
              <span className="grid size-9 place-items-center rounded-lg bg-info-soft text-primary">
                <Icon className="size-4" />
              </span>
              <h3 className="mt-3 text-sm font-semibold tracking-tight">{evidenceItem.label}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{evidenceItem.text}</p>
              <p className="mt-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                {evidenceItem.source}
              </p>
            </article>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        AI conclusions should be reviewed against the actual supporting records before final disposition.
      </p>
    </section>
  );
}
