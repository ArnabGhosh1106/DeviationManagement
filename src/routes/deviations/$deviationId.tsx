import { createFileRoute } from "@tanstack/react-router";
import { InvestigationView } from "@/components/pqi/InvestigationView";
import { findDeviation } from "@/lib/mock-data";

export const Route = createFileRoute("/deviations/$deviationId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.deviationId} Investigation | Pharma Quality Intelligence` },
      {
        name: "description",
        content: `AI-assisted investigation workspace for deviation ${params.deviationId}, including evidence, impact and QA review.`,
      },
      { property: "og:title", content: `${params.deviationId} AI Investigation` },
      {
        property: "og:description",
        content: "Multi-agent AI investigation with evidence and QA review.",
      },
    ],
  }),
  component: DeviationInvestigation,
});

function DeviationInvestigation() {
  const { deviationId } = Route.useParams();
  const deviation = findDeviation(deviationId);

  return (
    <InvestigationView
      investigationId={`INV-2026-${deviationId.replace("DEV-", "")}`}
      deviationId={deviationId}
      headline={
        deviation
          ? `${deviation.description} — ${deviation.equipment}, batch ${deviation.batch}`
          : "Temperature excursion during batch B12345"
      }
      risk={deviation?.risk ?? "High"}
    />
  );
}
