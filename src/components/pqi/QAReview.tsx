import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function QAReview({ recordId }: { recordId: string }) {
  const [comments, setComments] = useState("");

  const act = (action: string) => {
    toast.success(`${action} recorded for ${recordId}`, {
      description: comments
        ? "QA reviewer comments captured in the audit trail."
        : "No reviewer comments were provided.",
    });
  };

  return (
    <section className="surface-card p-6">
      <div className="flex items-start gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-info-soft text-primary">
          <ShieldCheck className="size-4" />
        </span>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">QA Review</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The AI investigation is complete. Review the findings before making the final
            quality decision.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="qa-comments">QA Reviewer Comments</Label>
        <Textarea
          id="qa-comments"
          rows={4}
          placeholder="Document your assessment of the AI findings…"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={() => act("Recommendations accepted")}>
          Accept Recommendations
        </Button>
        <Button variant="outline" onClick={() => act("Findings modified")}>
          Modify Findings
        </Button>
        <Button variant="outline" onClick={() => act("Sent back for investigation")}>
          Send Back for Investigation
        </Button>
        <Button variant="secondary" onClick={() => act("Investigation closed")}>
          Close Investigation
        </Button>
      </div>

      <p className="mt-5 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-xs text-muted-foreground">
        AI assists the investigation. Final decisions remain with authorized QA personnel.
      </p>
    </section>
  );
}
