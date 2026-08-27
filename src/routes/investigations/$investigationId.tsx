import { createFileRoute } from "@tanstack/react-router";
import { InvestigationView } from "@/components/pqi/InvestigationView";
import { findDeviation, findInvestigation } from "@/lib/mock-data";

export const Route = createFileRoute("/investigations/$investigationId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.investigationId} | Pharma Quality Intelligence` },
      {
        name: "description",
        content: `Multi-agent AI investigation ${params.investigationId}: understanding, historical analysis, impact assessment and QA recommendations.`,
      },
      { property: "og:title", content: `AI Investigation ${params.investigationId}` },
      {
        property: "og:description",
        content: "Multi-agent AI investigation with evidence, summary and QA review.",
      },
    ],
  }),
  component: InvestigationDetail,
});

function InvestigationDetail() {
  const { investigationId } = Route.useParams();
  const investigation = findInvestigation(investigationId);
  const deviation = investigation ? findDeviation(investigation.deviationId) : undefined;

  return (
    <InvestigationView
      investigationId={investigationId}
      deviationId={investigation?.deviationId ?? "DEV-1026"}
      headline={
        deviation
          ? `${deviation.description} — ${deviation.equipment}, batch ${deviation.batch}`
          : "Temperature excursion during batch B12345"
      }
      risk={investigation?.risk ?? "High"}
    />
  );
}
