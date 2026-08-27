import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles, Save } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/pqi/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AREAS, EQUIPMENT } from "@/lib/mock-data";

export const Route = createFileRoute("/change-controls/new")({
  head: () => ({
    meta: [
      { title: "Create Change | Pharma Quality Intelligence" },
      {
        name: "description",
        content:
          "Raise a manufacturing change request and run an AI-assisted change impact assessment.",
      },
      { property: "og:title", content: "Create Change" },
      {
        property: "og:description",
        content: "Raise a change request and analyze its impact.",
      },
    ],
  }),
  component: CreateChange,
});

function Field({
  label,
  children,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function CreateChange() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "CHG-2046",
    description:
      "Replace the existing temperature sensor on Reactor R-102 with a new calibrated sensor.",
    reason: "Repeated temperature measurement deviations have been observed.",
    area: "Manufacturing Area 3",
    equipment: "Reactor R-102",
    product: "Product A — Sterile Injectable",
    category: "Equipment Change",
    requestedBy: "John Smith",
    requestedDate: "2026-08-26",
    risk: "Medium",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Create Change"
        subtitle="Describe the proposed change before running the AI impact assessment."
      />

      <div className="surface-card p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Change ID" htmlFor="chg-id">
            <Input id="chg-id" readOnly className="font-mono" value={form.id} />
          </Field>

          <Field label="Change Category">
            <Select value={form.category} onValueChange={(v) => set("category", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Equipment Change", "Procedural Change", "Process Change", "Facility Change"].map(
                  (c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </Field>

          <div className="md:col-span-2">
            <Field label="Change Description" htmlFor="chg-desc">
              <Textarea
                id="chg-desc"
                rows={3}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Reason for Change" htmlFor="chg-reason">
              <Textarea
                id="chg-reason"
                rows={3}
                value={form.reason}
                onChange={(e) => set("reason", e.target.value)}
              />
            </Field>
          </div>

          <Field label="Area">
            <Select value={form.area} onValueChange={(v) => set("area", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AREAS.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Equipment">
            <Select value={form.equipment} onValueChange={(v) => set("equipment", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EQUIPMENT.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Affected Product" htmlFor="product">
            <Input
              id="product"
              value={form.product}
              onChange={(e) => set("product", e.target.value)}
            />
          </Field>

          <Field label="Requested By" htmlFor="requested-by">
            <Input
              id="requested-by"
              value={form.requestedBy}
              onChange={(e) => set("requestedBy", e.target.value)}
            />
          </Field>

          <Field label="Requested Date" htmlFor="requested-date">
            <Input
              id="requested-date"
              type="date"
              value={form.requestedDate}
              onChange={(e) => set("requestedDate", e.target.value)}
            />
          </Field>

          <Field label="Risk">
            <Select value={form.risk} onValueChange={(v) => set("risk", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Low", "Medium", "High", "Critical"].map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="mt-7 flex flex-wrap justify-end gap-2 border-t border-border pt-5">
          <Button variant="outline" onClick={() => toast.success(`${form.id} saved as draft`)}>
            <Save className="size-4" />
            Save as Draft
          </Button>
          <Button
            size="lg"
            onClick={() =>
              navigate({
                to: "/change-controls/$changeId",
                params: { changeId: "CHG-2046" },
              })
            }
          >
            <Sparkles className="size-4" />
            Analyze Change Impact
          </Button>
        </div>
      </div>
    </div>
  );
}
