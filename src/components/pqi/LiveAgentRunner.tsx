import { useEffect, useState } from "react";
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
  const [agentInput, setAgentInput] = useState<DeviationInvestigationInput>(input);
  const [investigation, setInvestigation] = useState<DeviationInvestigationResult>();
  const [qaReview, setQaReview] = useState<QARecommendationResult>();
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setAgentInput(input);
  }, [input.deviationId, input.description, input.equipment, input.batch, input.risk, input.investigationNotes]);

  const updateInput = (field: keyof DeviationInvestigationInput, value: string) => {
    setAgentInput((current) => ({ ...current, [field]: value }));
  };

  const runAgents = async () => {
    setRunning(true);
    setError(undefined);
    setInvestigation(undefined);
    setQaReview(undefined);

    try {
      const investigationResult = await runDeviationInvestigationAgent({ data: agentInput });
      setInvestigation(investigationResult);

      const qaResult = await runQARecommendationAgent({
        data: { deviation: agentInput, investigation: investigationResult },
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
            Edit the current deviation details below. The agents will use exactly these values when you click Run live agents.
          </p>
        </div>
        <Button onClick={runAgents} disabled={running || !agentInput.description.trim()}>
          {running ? <Loader2 className="size-4 animate-spin" /> : <Bot className="size-4" />}
          {running ? "Running agents..." : "Run live agents"}
        </Button>
      </div>

      <div className="grid gap-3 rounded-lg border border-border p-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-medium">Deviation ID</span>
          <input className="w-full rounded-md border border-input bg-background px-3 py-2" value={agentInput.deviationId ?? ""} onChange={(event) => updateInput("deviationId", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium">Batch</span>
          <input className="w-full rounded-md border border-input bg-background px-3 py-2" value={agentInput.batch ?? ""} onChange={(event) => updateInput("batch", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium">Equipment / Area</span>
          <input className="w-full rounded-md border border-input bg-background px-3 py-2" value={agentInput.equipment ?? ""} onChange={(event) => updateInput("equipment", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium">Current risk</span>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2" value={agentInput.risk ?? ""} onChange={(event) => updateInput("risk", event.target.value)}>
            <option value="">Not specified</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>
        <label className="space-y-1 text-sm md:col-span-2">
          <span className="font-medium">Deviation description</span>
          <textarea className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2" value={agentInput.description} onChange={(event) => updateInput("description", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm md:col-span-2">
          <span className="font-medium">Investigation notes</span>
          <textarea className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2" value={agentInput.investigationNotes ?? ""} onChange={(event) => updateInput("investigationNotes", event.target.value)} placeholder="Add the latest observations, evidence, measurements, or changes here" />
        </label>
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
