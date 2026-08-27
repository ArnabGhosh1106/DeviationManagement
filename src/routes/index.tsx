import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Bot,
  Check,
  CircleDashed,
  FileWarning,
  GitPullRequestArrow,
  Loader2,
  ShieldAlert,
  Search,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/pqi/PageHeader";
import { KpiCard } from "@/components/pqi/KpiCard";
import { DeviationTable } from "@/components/pqi/DeviationTable";
import { Button } from "@/components/ui/button";
import { AI_ACTIVITY, DEVIATIONS, DEVIATION_TREND } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quality Intelligence Dashboard | Pharma Quality Intelligence" },
      {
        name: "description",
        content:
          "Monitor open deviations, high-risk events and AI-assisted investigations across pharmaceutical manufacturing areas.",
      },
      { property: "og:title", content: "Quality Intelligence Dashboard" },
      {
        property: "og:description",
        content:
          "Monitor open deviations, high-risk events and AI-assisted investigations across manufacturing areas.",
      },
    ],
  }),
  component: Dashboard,
});

function ActivityIcon({ state }: { state: "Completed" | "Running" | "Pending" }) {
  if (state === "Completed")
    return (
      <span className="grid size-7 place-items-center rounded-full bg-success text-success-foreground">
        <Check className="size-3.5" />
      </span>
    );
  if (state === "Running")
    return (
      <span className="pulse-ring grid size-7 place-items-center rounded-full bg-info-soft text-primary">
        <Loader2 className="size-3.5 animate-spin" />
      </span>
    );
  return (
    <span className="grid size-7 place-items-center rounded-full bg-neutral-soft text-muted-foreground">
      <CircleDashed className="size-3.5" />
    </span>
  );
}

function Dashboard() {
  const recent = DEVIATIONS.slice(0, 3);

  return (
    <div className="space-y-8 pb-10">
      <PageHeader
        title="Quality Intelligence Dashboard"
        subtitle="AI-assisted Deviation and Change Management"
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/investigations">
                <Search className="size-4" />
                View investigations
              </Link>
            </Button>
            <Button asChild>
              <Link to="/deviations/new">+ Create Deviation</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Open Deviations" value={27} icon={FileWarning} tone="info" />
        <KpiCard label="High Risk" value={5} icon={ShieldAlert} tone="danger" />
        <KpiCard label="Under Investigation" value={11} icon={Activity} tone="warning" />
        <KpiCard label="AI-Assisted Investigations" value={18} icon={Bot} tone="success" />
        <KpiCard
          label="Open Change Controls"
          value={8}
          icon={GitPullRequestArrow}
          tone="default"
        />
      </div>

      <section className="surface-card p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Deviation Trend</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Monthly deviations recorded over the last 6 months.
            </p>
          </div>
        </div>
        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DEVIATION_TREND} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="deviations"
                name="Deviations"
                stroke="var(--chart-1)"
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 2 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="highRisk"
                name="High risk"
                stroke="var(--chart-4)"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Recent Deviations</h2>
          <Link
            to="/deviations"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all deviations
          </Link>
        </div>
        <DeviationTable deviations={recent} compact />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">AI Investigation Activity</h2>
        <div className="surface-card divide-y divide-border">
          {AI_ACTIVITY.map((a) => (
            <div key={a.agent} className="flex items-center gap-4 px-5 py-4">
              <ActivityIcon state={a.state} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {a.agent}{" "}
                  <span className="font-normal text-muted-foreground">
                    {a.state === "Completed"
                      ? "completed"
                      : a.state === "Running"
                        ? "running"
                        : "pending"}
                  </span>
                </p>
                <p className="font-mono text-xs text-muted-foreground">{a.deviation}</p>
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">{a.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
