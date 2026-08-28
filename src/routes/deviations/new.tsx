import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles, Save } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/pqi/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveCurrentDeviation } from "@/lib/deviation-session";
import type { DeviationInvestigationInput } from "@/lib/deviation-agents";

const CLASSIFICATIONS = ["Temperature Excursion", "Process Parameter Deviation", "Equipment Failure", "Documentation Deviation", "Environmental Excursion", "Cleaning Deviation"] as const;
const SEVERITIES = ["Low", "Medium", "High", "Critical"] as const;

export const Route = createFileRoute("/deviations/new")({
  head: () => ({ meta: [{ title: "Create Deviation | Pharma Quality Intelligence" }, { name: "description", content: "Capture manufacturing event details to begin an AI-assisted deviation investigation." }] }),
  component: CreateDeviation,
});

function Field({ label, children, htmlFor }: { label: string; children: React.ReactNode; htmlFor?: string }) { return <div className="space-y-2"><Label htmlFor={htmlFor}>{label}</Label>{children}</div>; }

function CreateDeviation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", description: "", classification: "", area: "", equipment: "", batch: "", datetime: "", reporter: "", severity: "", comments: "" });

  useEffect(() => {
    const now = new Date();
    setForm((current) => current.id ? current : { ...current, id: `DEV-${now.getFullYear()}-${String(now.getTime()).slice(-6)}`, datetime: now.toISOString().slice(0, 16) });
  }, []);

  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const toAgentInput = (): DeviationInvestigationInput => ({ deviationId: form.id, description: form.description, classification: form.classification || undefined, area: form.area || undefined, equipment: form.equipment || undefined, batch: form.batch || undefined, occurredAt: form.datetime || undefined, reporter: form.reporter || undefined, risk: form.severity || undefined, investigationNotes: form.comments || undefined });
  const saveAndAnalyze = () => {
    if (!form.description.trim()) { toast.error("Enter a deviation description before starting the AI investigation."); return; }
    saveCurrentDeviation(toAgentInput());
    navigate({ to: "/investigations/$investigationId", params: { investigationId: `INV-${form.id || "NEW"}` } });
  };

  return <div className="space-y-6 pb-10">
    <PageHeader title="Create Deviation" subtitle="Capture the event details to begin an investigation." />
    <div className="surface-card p-6"><div className="grid gap-5 md:grid-cols-2">
      <Field label="Deviation ID" htmlFor="dev-id"><Input id="dev-id" value={form.id} readOnly className="font-mono" /><p className="text-xs text-muted-foreground">Auto-generated when the deviation form opens.</p></Field>
      <Field label="Initial Classification"><Select value={form.classification} onValueChange={(value) => set("classification", value)}><SelectTrigger><SelectValue placeholder="Select classification" /></SelectTrigger><SelectContent>{CLASSIFICATIONS.map((classification) => <SelectItem key={classification} value={classification}>{classification}</SelectItem>)}</SelectContent></Select></Field>
      <div className="md:col-span-2"><Field label="Deviation Description" htmlFor="dev-desc"><Textarea id="dev-desc" rows={3} value={form.description} placeholder="Describe what happened, including the event and observed impact." onChange={(event) => set("description", event.target.value)} /></Field></div>
      <Field label="Area" htmlFor="area"><Input id="area" value={form.area} placeholder="Enter area" onChange={(event) => set("area", event.target.value)} /></Field>
      <Field label="Equipment" htmlFor="equipment"><Input id="equipment" value={form.equipment} placeholder="Enter equipment" onChange={(event) => set("equipment", event.target.value)} /></Field>
      <Field label="Batch Number" htmlFor="batch"><Input id="batch" className="font-mono" value={form.batch} placeholder="Enter batch number" onChange={(event) => set("batch", event.target.value)} /></Field>
      <Field label="Date and Time" htmlFor="datetime"><Input id="datetime" type="datetime-local" value={form.datetime} onChange={(event) => set("datetime", event.target.value)} /></Field>
      <Field label="Reporter" htmlFor="reporter"><Input id="reporter" value={form.reporter} placeholder="Enter reporter name" onChange={(event) => set("reporter", event.target.value)} /></Field>
      <Field label="Severity"><Select value={form.severity} onValueChange={(value) => set("severity", value)}><SelectTrigger><SelectValue placeholder="Select severity" /></SelectTrigger><SelectContent>{SEVERITIES.map((severity) => <SelectItem key={severity} value={severity}>{severity}</SelectItem>)}</SelectContent></Select></Field>
      <div className="md:col-span-2"><Field label="Additional Comments" htmlFor="comments"><Textarea id="comments" rows={5} placeholder="Immediate actions taken, observations, related records…" value={form.comments} onChange={(event) => set("comments", event.target.value)} /></Field></div>
    </div>
    <div className="mt-7 flex flex-wrap justify-end gap-2 border-t border-border pt-5"><Button variant="outline" onClick={() => { saveCurrentDeviation(toAgentInput()); toast.success(`${form.id || "Deviation"} saved for this browser session`); }}><Save className="size-4" />Save as Draft</Button><Button size="lg" onClick={saveAndAnalyze}><Sparkles className="size-4" />Analyze with AI</Button></div>
    </div>
  </div>;
}
