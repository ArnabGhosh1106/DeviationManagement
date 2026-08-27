import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { InvestigationView } from "@/components/pqi/InvestigationView";
import { LiveAgentRunner } from "@/components/pqi/LiveAgentRunner";
import { findDeviation, findInvestigation } from "@/lib/mock-data";
import type { DeviationInvestigationInput } from "@/lib/deviation-agents";

export const Route = createFileRoute("/investigations/$investigationId")({
  head: ({ params }) => ({ meta: [
    { title: `${params.investigationId} | Pharma Quality Intelligence` },
    { name: "description", content: `Multi-agent AI investigation ${params.investigationId}: live deviation investigation and independent QA recommendations.` },
    { property: "og:title", content: `AI Investigation ${params.investigationId}` },
    { property: "og:description", content: "Multi-agent AI investigation with Gemini-powered investigation and QA review." },
  ] }),
  component: InvestigationDetail,
});

function InvestigationDetail() {
  const { investigationId } = Route.useParams();
  const investigation = findInvestigation(investigationId);
  const deviation = investigation ? findDeviation(investigation.deviationId) : undefined;
  const defaultDeviationId = investigation?.deviationId ?? "DEV-1026";
  const defaultHeadline = deviation ? `${deviation.description} — ${deviation.equipment}, batch ${deviation.batch}` : "Temperature excursion during batch B12345";

  const [agentInput, setAgentInput] = useState<DeviationInvestigationInput>({
    deviationId: defaultDeviationId,
    description: deviation?.description ?? defaultHeadline,
    equipment: deviation?.equipment,
    batch: deviation?.batch,
    risk: deviation?.risk ?? investigation?.risk ?? "High",
  });

  const headline = agentInput.description.trim() || defaultHeadline;
  const deviationId = agentInput.deviationId?.trim() || defaultDeviationId;
  const risk = (["Low", "Medium", "High", "Critical"] as const).includes(agentInput.risk as "Low" | "Medium" | "High" | "Critical")
    ? agentInput.risk as "Low" | "Medium" | "High" | "Critical"
    : investigation?.risk ?? "High";

  return (
    <div className="space-y-8 pb-10">
      <InvestigationView investigationId={investigationId} deviationId={deviationId} headline={headline} risk={risk} agentInput={agentInput} />
      <LiveAgentRunner input={agentInput} onInputChange={setAgentInput} />
    </div>
  );
}
