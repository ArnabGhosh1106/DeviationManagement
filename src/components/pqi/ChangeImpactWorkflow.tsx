import { Check, CircleDashed, Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgentDefinition, AgentState } from "@/lib/ai-agents";

export function ChangeImpactWorkflow({
  steps,
  states,
  completed,
  progress,
}: {
  steps: AgentDefinition[];
  states: AgentState[];
  completed: number;
  progress: number;
}) {
  return (
    <section className="space-y-5">
      <div className="surface-card p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Change Impact Workflow
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Specialized AI agents evaluate each impact dimension in sequence.
            </p>
          </div>
          <p className="text-sm font-medium tabular-nums">
            {completed} of {steps.length} steps completed
          </p>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-neutral-soft">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col items-stretch">
        {steps.map((step, i) => (
          <div key={step.key}>
            <div
              className={cn(
                "surface-card flex items-start gap-4 p-4 transition-all duration-500",
                states[i] === "Running" && "border-primary/40 shadow-[var(--shadow-raised)]",
                states[i] === "Completed" && "border-success/30",
                states[i] === "Pending" && "opacity-70",
              )}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full",
                  states[i] === "Completed" && "bg-success text-success-foreground",
                  states[i] === "Running" && "pulse-ring bg-info-soft text-primary",
                  states[i] === "Pending" && "bg-neutral-soft text-muted-foreground",
                )}
              >
                {states[i] === "Completed" ? (
                  <Check className="size-4" />
                ) : states[i] === "Running" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <CircleDashed className="size-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold tracking-tight">{step.name}</h3>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {states[i]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                {states[i] === "Completed" ? (
                  <div className="rise-in mt-3 rounded-lg border border-border bg-secondary/60 px-3 py-2">
                    <p className="text-sm font-medium">{step.result.headline}</p>
                    {step.result.items?.length ? (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {step.result.items.map((item) => (
                          <li
                            key={item.label}
                            className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs"
                          >
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
            {i < steps.length - 1 ? (
              <div className="flex justify-center py-1.5">
                <ChevronDown
                  className={cn(
                    "size-4",
                    states[i] === "Completed" ? "text-success" : "text-muted-foreground/50",
                  )}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
