import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Cpu, FileText, Repeat, Sparkles } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/pqi/PageHeader";
import { KpiCard } from "@/components/pqi/KpiCard";
import {
  AI_PATTERNS,
  DEVIATION_CATEGORIES,
  DEVIATION_TREND,
  EQUIPMENT_FREQUENCY,
  RISK_DISTRIBUTION,
} from "@/lib/mock-data";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "AI Quality Insights | Pharma Quality Intelligence" },
      {
        name: "description",
        content:
          "AI-identified deviation patterns, equipment hotspots, CAPA effectiveness signals and risk distribution.",
      },
      { property: "og:title", content: "AI Quality Insights" },
      {
        property: "og:description",
        content: "AI-identified deviation patterns and quality trends.",
      },
    ],
  }),
  component: InsightsPage,
});

const RISK_COLORS = ["var(--chart-5)", "var(--chart-3)", "var(--chart-4)", "var(--danger)"];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  fontSize: 12,
};

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-card p-6">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <div className="mt-5 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function InsightsPage() {
  return (
    <div className="space-y-8 pb-10">
      <PageHeader
        title="AI Quality Insights"
        subtitle="Cross-record patterns detected across deviations, equipment, SOPs and CAPAs."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Recurring Deviation Patterns" value={12} icon={Repeat} tone="info" />
        <KpiCard
          label="Potential CAPA Effectiveness Issues"
          value={4}
          icon={AlertTriangle}
          tone="warning"
        />
        <KpiCard label="Frequently Impacted Equipment" value={7} icon={Cpu} tone="danger" />
        <KpiCard
          label="SOPs Frequently Associated with Deviations"
          value={9}
          icon={FileText}
          tone="success"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Deviation Categories">
          <BarChart data={DEVIATION_CATEGORIES} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="category" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
            <Bar dataKey="count" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Equipment with Highest Deviation Frequency">
          <BarChart data={EQUIPMENT_FREQUENCY} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis
              type="category"
              dataKey="equipment"
              width={110}
              tickLine={false}
              axisLine={false}
              fontSize={11}
              stroke="var(--muted-foreground)"
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
            <Bar dataKey="count" fill="var(--chart-4)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Monthly Deviation Trend">
          <LineChart data={DEVIATION_TREND} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="deviations"
              stroke="var(--chart-1)"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ChartCard>

        <ChartCard title="Risk Distribution">
          <PieChart>
            <Pie
              data={RISK_DISTRIBUTION}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              label
            >
              {RISK_DISTRIBUTION.map((entry, i) => (
                <Cell key={entry.name} fill={RISK_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ChartCard>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">AI-Identified Patterns</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {AI_PATTERNS.map((p) => (
            <article key={p} className="surface-card flex gap-3 p-5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-info-soft text-primary">
                <Sparkles className="size-4" />
              </span>
              <p className="text-sm">{p}</p>
            </article>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Insights are AI-generated and intended to support quality review.
        </p>
      </section>
    </div>
  );
}
