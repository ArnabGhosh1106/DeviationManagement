import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/pqi/PageHeader";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | Pharma Quality Intelligence" },
      {
        name: "description",
        content:
          "Configure AI assistance behaviour, QA approval requirements and quality notification preferences.",
      },
      { property: "og:title", content: "Settings" },
      {
        property: "og:description",
        content: "Configure AI assistance and QA approval preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

const TOGGLES = [
  {
    label: "Auto-start AI investigation on deviation creation",
    hint: "Agents begin analysis as soon as a deviation is submitted.",
    on: true,
  },
  {
    label: "Require QA approval before closure",
    hint: "AI can never close a deviation without authorized QA sign-off.",
    on: true,
    locked: true,
  },
  {
    label: "Email QA reviewers when agents complete",
    hint: "Notification sent to the assigned QA reviewer group.",
    on: false,
  },
  {
    label: "Include historical CAPA effectiveness in recommendations",
    hint: "Agents evaluate prior CAPA outcomes when suggesting actions.",
    on: true,
  },
];

function SettingsPage() {
  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Settings"
        subtitle="Configure AI assistance behaviour and quality workflow controls."
      />

      <section className="surface-card p-6">
        <h2 className="text-base font-semibold tracking-tight">Signed in as</h2>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-accent font-mono text-sm font-semibold text-accent-foreground">
            QM
          </span>
          <div>
            <p className="text-sm font-medium">QA Manager</p>
            <p className="text-xs text-muted-foreground">
              Quality Assurance · Site 2, Ireland
            </p>
          </div>
        </div>
      </section>

      <section className="surface-card divide-y divide-border p-2">
        {TOGGLES.map((t) => (
          <div key={t.label} className="flex items-start justify-between gap-6 p-4">
            <div>
              <Label className="text-sm font-medium">{t.label}</Label>
              <p className="mt-1 text-xs text-muted-foreground">{t.hint}</p>
            </div>
            <Switch defaultChecked={t.on} disabled={t.locked} />
          </div>
        ))}
      </section>

      <Separator />

      <p className="text-xs text-muted-foreground">
        Prototype build — AI agents are simulated and no external AI service is connected.
      </p>
    </div>
  );
}
