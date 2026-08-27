import { createFileRoute, Link } from "@tanstack/react-router";

import { RiskBadge, StatusBadge } from "@/components/pqi/badges";
import { PageHeader } from "@/components/pqi/PageHeader";
import { INVESTIGATIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/investigations/")({
  head: () => ({
    meta: [
      { title: "AI Investigations | Pharma Quality Intelligence" },
      {
        name: "description",
        content:
          "Monitor multi-agent AI investigations, current agent, progress and risk across open deviations.",
      },
      { property: "og:title", content: "AI Investigations" },
      {
        property: "og:description",
        content: "Monitor multi-agent AI investigations and their progress.",
      },
    ],
  }),
  component: InvestigationsPage,
});

function InvestigationsPage() {
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="AI Investigations"
        subtitle="Live status of every AI-assisted deviation investigation."
      />

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60 text-left">
                {[
                  "Investigation ID",
                  "Deviation ID",
                  "Current Agent",
                  "Progress",
                  "Risk",
                  "Started",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INVESTIGATIONS.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-border/70 last:border-0 transition-colors hover:bg-accent/40"
                >
                  <td className="px-4 py-3 font-mono text-xs font-semibold whitespace-nowrap">
                    <Link
                      to="/investigations/$investigationId"
                      params={{ investigationId: inv.id }}
                      className="text-primary hover:underline"
                    >
                      {inv.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                    <Link
                      to="/deviations/$deviationId"
                      params={{ deviationId: inv.deviationId }}
                      className="hover:underline"
                    >
                      {inv.deviationId}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{inv.currentAgent}</td>
                  <td className="px-4 py-3 min-w-[160px]">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-soft">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${inv.progress}%` }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {inv.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <RiskBadge risk={inv.risk} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {inv.started}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={inv.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
