import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bot, RotateCw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentWorkflow } from "./AgentWorkflow";
import { InvestigationSummary } from "./InvestigationSummary";
import { EvidenceCard } from "./EvidenceCard";
import { QAReview } from "./QAReview";
import { StatusBadge } from "./badges";
import { useAgentSequence } from "./useAgentSequence";
import { buildDeviationAgents, type DeviationAgentInput } from "@/lib/ai-agents";
import type { Risk } from "@/lib/mock-data";

export function InvestigationView({
  investigationId,
  deviationId,
  headline,
  risk,
  agentInput,
}: {
  investigationId: string;
  deviationId: string;
  headline: string;
  risk: Risk;
  agentInput: DeviationAgentInput;
}) {
  const agents = buildDeviationAgents(agentInput);
  const { states, completed, progress, allDone, start } = useAgentSequence(agents.length, 2000);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <Link to="/deviations" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-3.5" />
          Back to deviations
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-info-soft text-primary"><Bot className="size-4" /></span>
              <h1 className="text-2xl font-semibold tracking-tight">AI Investigation</h1>
            </div>
            <p className="mt-2 text-sm text-muted-foreground"><span className="font-mono font-semibold text-foreground">{deviationId}</span> · {headline}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{investigationId}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={allDone ? "Completed" : "Under Investigation"} />
            <span className="text-xs text-muted-foreground">{allDone ? "AI Investigation Completed" : "AI Investigation in Progress"}</span>
            <Button variant="outline" size="sm" onClick={start}><RotateCw className="size-3.5" />Re-run agents</Button>
          </div>
        </div>
      </div>

      <AgentWorkflow agents={agents} states={states} completed={completed} progress={progress} />

      {allDone ? (
        <>
          <InvestigationSummary risk={risk} />
          <EvidenceCard />
          <div className="flex justify-end"><Button size="lg" asChild><a href="#qa-review"><Send className="size-4" />Send to QA Review</a></Button></div>
          <div id="qa-review" className="scroll-mt-8"><QAReview recordId={agentInput.deviationId?.trim() || deviationId} /></div>
        </>
      ) : null}
    </div>
  );
}
