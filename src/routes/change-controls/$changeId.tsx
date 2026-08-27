import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Info, RotateCw } from "lucide-react";
import { PageHeader } from "@/components/pqi/PageHeader";
import { ChangeImpactWorkflow } from "@/components/pqi/ChangeImpactWorkflow";
import { QAReview } from "@/components/pqi/QAReview";
import { RiskBadge } from "@/components/pqi/badges";
import { useAgentSequence } from "@/components/pqi/useAgentSequence";
import { Button } from "@/components/ui/button";
import { CHANGE_IMPACT_STEPS } from "@/lib/ai-agents";
import { findChange } from "@/lib/mock-data";

export const Route = createFileRoute("/change-controls/$changeId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.changeId} Impact Assessment | Pharma Quality Intelligence` },
      {
        name: "description",
        content: `AI change impact assessment for ${params.changeId}: equipment, SOP, training, validation and historical deviation analysis.`,
      },
      { property: "og:title", content: `AI Change Impact Assessment ${params.changeId}` },
      {
        property: "og:description",
        content: "Equipment, SOP, training, validation and historical deviation impact.",
      },
    ],
  }),
  component: ChangeImpactPage,
});

function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface-card p-5">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function ChangeImpactPage() {
  const { changeId } = Route.useParams();
  const change = findChange(changeId);
  const { states, completed, progress, allDone, start } = useAgentSequence(
    CHANGE_IMPACT_STEPS.length,
    1600,
  );

  return (
    <div className="space-y-8 pb-10">
      <Link
        to="/change-controls"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Back to change controls
      </Link>

      <PageHeader
        title="AI Change Impact Assessment"
        subtitle={`${changeId} · ${
          change?.description ??
          "Replace the existing temperature sensor on Reactor R-102 with a new calibrated sensor."
        }`}
        actions={
          <Button variant="outline" onClick={start}>
            <RotateCw className="size-4" />
            Re-run assessment
          </Button>
        }
      />

      <ChangeImpactWorkflow
        steps={CHANGE_IMPACT_STEPS}
        states={states}
        completed={completed}
        progress={progress}
      />

      {allDone ? (
        <section className="rise-in space-y-4">
          <div className="surface-card flex flex-wrap items-center justify-between gap-3 p-6">
            <h2 className="text-lg font-semibold tracking-tight">Overall Impact</h2>
            <RiskBadge risk="Medium" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ResultCard title="Equipment Impact">Reactor R-102 affected</ResultCard>
            <ResultCard title="SOP Impact">
              <span className="font-mono">SOP-102</span>,{" "}
              <span className="font-mono">SOP-115</span>
            </ResultCard>
            <ResultCard title="Training Impact">
              Operator refresher training may be required.
            </ResultCard>
            <ResultCard title="Validation Impact">QA assessment recommended.</ResultCard>
            <ResultCard title="Historical Deviations">
              3 related deviations identified.
            </ResultCard>
            <ResultCard title="Overall Impact">MEDIUM</ResultCard>
          </div>

          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            AI-generated impact assessment. Final impact determination requires QA review.
          </p>

          <QAReview recordId={changeId} />
        </section>
      ) : null}
    </div>
  );
}
