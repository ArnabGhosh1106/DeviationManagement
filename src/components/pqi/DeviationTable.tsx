import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { RiskBadge, StatusBadge } from "./badges";
import type { Deviation } from "@/lib/mock-data";

export function DeviationTable({
  deviations,
  compact = false,
}: {
  deviations: Deviation[];
  compact?: boolean;
}) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left">
              {[
                "Deviation ID",
                "Description",
                "Area",
                "Equipment",
                ...(compact ? [] : ["Batch"]),
                "Risk",
                "Status",
                compact ? "Date" : "Created",
                ...(compact ? [] : ["Action"]),
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
            {deviations.map((d) => (
              <tr
                key={d.id}
                className="border-b border-border/70 last:border-0 transition-colors hover:bg-accent/40"
              >
                <td className="px-4 py-3 font-mono text-xs font-semibold whitespace-nowrap">
                  <Link
                    to="/deviations/$deviationId"
                    params={{ deviationId: d.id }}
                    className="text-primary hover:underline"
                  >
                    {d.id}
                  </Link>
                </td>
                <td className="px-4 py-3 min-w-[220px]">{d.description}</td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {d.area}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {d.equipment}
                </td>
                {compact ? null : (
                  <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                    {d.batch}
                  </td>
                )}
                <td className="px-4 py-3">
                  <RiskBadge risk={d.risk} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={d.status} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {d.created}
                </td>
                {compact ? null : (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link
                      to="/deviations/$deviationId"
                      params={{ deviationId: d.id }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      View investigation
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </td>
                )}
              </tr>
            ))}
            {deviations.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  No deviations match the current filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
