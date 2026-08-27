import { useState } from "react";
import { Bot, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  runDeviationInvestigationAgent,
  runQARecommendationAgent,
  type DeviationInvestigationInput,
  type DeviationInvestigationResult,
  type QARecommendationResult,
} from "@/lib/deviation-agents";

type Props = { input: DeviationInvestigationInput };

export function LiveAgentRunner({ input }: Props) {
  const [investigation, setInvestigation] = useState<DeviationInvestigationResult>();
  const [qaReview, setQaReview] = useState<QARecommendationResult>();
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string>();

  const runAgents = async () => {
    setRunning(true);
    setError(undefined);
    setInvestigation(undefined);
    setQaReview(undefined);

    try {
      const investigationResult = await runDeviationInvestigationAgent({ data: input });
      setInvestigation(investigationResult);

      const qaResult = await runQARecommendationAgent({
        data: { deviation: input, investigation: investigationResult },
      });
      setQaReview(qaResult);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The AI agents could not complete the review.");
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="surface-card space-y-5 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="size-5 text-primary" />
            <h2 className="font-semibold">Live AI Agent Review</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Run the Deviation Investigation Agent followed by an independent QA Recommendation Agent.
          </p>
        </div>
        <Button onClick={runAgents} disabled={running}>
          {running ? <Loader2 className="size-4 animate-spin" /> : <Bot className="size-4" />}
          {running ? "Running agents..." : "Run live agents"}
        </Button>
      </div>

      {error ? <p className="rounded-md border border-destructive/30 p-3 text-sm text-destructive">{error}</p> : null}

      {investigation ? (
        <div className="space-y-3 rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 font-medium"><CheckCircle2 className="size-4 text-primary" />Deviation Investigation Agent</div>
          <p className="text-sm">{investigation.summary}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <ResultList title={`Risk: ${investigation.riskLevel}`} items={investigation.potentialRootCauses} />
            <ResultList title="Recommended actions" items={investigation.recommendedActions} />
          </div>
          {investigation.missingInformation.length ? <ResultList title="Information still needed" items={investigation.missingInformation} /> : null}
        </div>
      ) : null}

      {qaReview ? (
        <div className="space-y-3 rounded-lg border border-border p-4">
          <div className="flex items-center gap-2 font-medium"><ShieldCheck className="size-4 text-primary" />QA Recommendation Agent</div>
          <p className="text-sm font-medium">{qaReview.recommendation} · {qaReview.closureReadiness}</p>
          <p className="text-sm text-muted-foreground">{qaReview.rationale}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <ResultList title="Missing evidence" items={qaReview.missingEvidence} />
            <ResultList title="CAPA recommendations" items={qaReview.capaRecommendations} />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{title}</h3>
      {items.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{items.map((item) => <li key={item}>{item}</li>)}</ul>
      ) : <p className="mt-2 text-sm text-muted-foreground">None identified.</p>}
    </div>
  );
}
