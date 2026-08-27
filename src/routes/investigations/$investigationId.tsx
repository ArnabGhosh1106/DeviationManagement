import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { InvestigationView } from "@/components/pqi/InvestigationView";
import { LiveAgentRunner } from "@/components/pqi/LiveAgentRunner";
import { findDeviation, findInvestigation } from "@/lib/mock-data";
import type { DeviationInvestigationInput } from "@/lib/deviation-agents";

export const Route = createFileRoute("/investigations/$investigationId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.investigationId} | Pharma Quality Intelligence` },
      {
        name: "description",
        content: `Multi-agent AI investigation ${params.investigationId}: live deviation investigation and independent QA recommendations.`,
      },
      { property: "og:title", content: `AI Investigation ${params.investigationId}` },
      {
        property: "og:description",
        content: "Multi-agent AI investigation with Gemini-powered investigation and QA review.",
      },
    ],
  }),
  component: InvestigationDetail,
});

function InvestigationDetail() {
  const { investigationId } = Route.useParams();
  const investigation = findInvestigation(investigationId);
  const deviation = investigation ? findDeviation(investigation.deviationId) : undefined;

  // There is deliberately no sample fallback here. Every displayed value comes
  // from the selected record or from the editable user input.
  const [agentInput, setAgentInput] = useState<DeviationInvestigationInput>({
    deviationId: investigation?.deviationId ?? investigationId,
    description: deviation?.description ?? "",
    equipment: deviation?.equipment ?? "",
    batch: deviation?.batch ?? "",
    risk: deviation?.risk ?? investigation?.risk ?? "",
    investigationNotes: "",
  });

  return (
    <div className="space-y-8 pb-10">
      <InvestigationView
        investigationId={investigationId}
        agentInput={agentInput}
      />
      <LiveAgentRunner input={agentInput} onInputChange={setAgentInput} />
    </div>
  );
}
