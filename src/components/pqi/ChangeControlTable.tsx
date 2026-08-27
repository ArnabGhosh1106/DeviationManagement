import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { RiskBadge, StatusBadge } from "./badges";
import type { ChangeControl } from "@/lib/mock-data";

export function ChangeControlTable({ changes }: { changes: ChangeControl[] }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left">
              {[
                "Change ID",
                "Description",
                "Area",
                "Equipment",
                "Risk",
                "Status",
                "Created",
                "Action",
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
            {changes.map((c) => (
              <tr
                key={c.id}
                className="border-b border-border/70 last:border-0 transition-colors hover:bg-accent/40"
              >
                <td className="px-4 py-3 font-mono text-xs font-semibold whitespace-nowrap">
                  <Link
                    to="/change-controls/$changeId"
                    params={{ changeId: c.id }}
                    className="text-primary hover:underline"
                  >
                    {c.id}
                  </Link>
                </td>
                <td className="px-4 py-3 min-w-[220px]">{c.description}</td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {c.area}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {c.equipment}
                </td>
                <td className="px-4 py-3">
                  <RiskBadge risk={c.risk} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {c.created}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link
                    to="/change-controls/$changeId"
                    params={{ changeId: c.id }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Impact assessment
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
