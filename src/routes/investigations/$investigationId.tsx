import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { InvestigationView } from "@/components/pqi/InvestigationView";
import { LiveAgentRunner } from "@/components/pqi/LiveAgentRunner";
import { loadCurrentDeviation, saveCurrentDeviation } from "@/lib/deviation-session";
import type { DeviationInvestigationInput } from "@/lib/deviation-agents";

export const Route = createFileRoute("/investigations/$investigationId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.investigationId} | Pharma Quality Intelligence` },
      { name: "description", content: `Live multi-agent AI investigation ${params.investigationId}.` },
    ],
  }),
  component: InvestigationDetail,
});

function InvestigationDetail() {
  const { investigationId } = Route.useParams();
  const [agentInput, setAgentInput] = useState<DeviationInvestigationInput>({
    deviationId: investigationId,
    description: "",
    classification: "",
    area: "",
    equipment: "",
    batch: "",
    occurredAt: "",
    reporter: "",
    risk: "",
    investigationNotes: "",
  });

  useEffect(() => {
    const saved = loadCurrentDeviation();
    if (saved) setAgentInput(saved);
  }, [investigationId]);

  const handleInputChange = (next: DeviationInvestigationInput) => {
    setAgentInput(next);
    saveCurrentDeviation(next);
  };

  return (
    <div className="space-y-8 pb-10">
      <InvestigationView investigationId={investigationId} agentInput={agentInput} />
      <LiveAgentRunner input={agentInput} onInputChange={handleInputChange} />
    </div>
  );
}
