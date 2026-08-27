import { Check, CircleDashed, Loader2, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgentDefinition, AgentState } from "@/lib/ai-agents";

const stateLabel: Record<AgentState, string> = {
  Pending: "Pending",
  Running: "Running",
  Completed: "Completed",
  Failed: "Failed",
};

function StateIcon({ state }: { state: AgentState }) {
  if (state === "Completed")
    return (
      <span className="grid size-9 place-items-center rounded-full bg-success text-success-foreground">
        <Check className="size-5" />
      </span>
    );
  if (state === "Running")
    return (
      <span className="pulse-ring grid size-9 place-items-center rounded-full bg-info-soft text-primary">
        <Loader2 className="size-5 animate-spin" />
      </span>
    );
  if (state === "Failed")
    return (
      <span className="grid size-9 place-items-center rounded-full bg-danger text-danger-foreground">
        <TriangleAlert className="size-5" />
      </span>
    );
  return (
    <span className="grid size-9 place-items-center rounded-full bg-neutral-soft text-muted-foreground">
      <CircleDashed className="size-5" />
    </span>
  );
}

export function AgentCard({
  index,
  agent,
  state,
}: {
  index: number;
  agent: AgentDefinition;
  state: AgentState;
}) {
  const chip: Record<AgentState, string> = {
    Pending: "bg-neutral-soft text-muted-foreground border-border",
    Running: "bg-info-soft text-primary border-primary/25",
    Completed: "bg-success-soft text-success border-success/30",
    Failed: "bg-danger-soft text-danger border-danger/30",
  };

  return (
    <div
      className={cn(
        "surface-card p-5 transition-all duration-500",
        state === "Running" && "border-primary/40 shadow-[var(--shadow-raised)]",
        state === "Completed" && "border-success/30",
        state === "Pending" && "opacity-75",
      )}
    >
      <div className="flex items-start gap-4">
        <StateIcon state={state} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">
              Agent {index + 1}
            </span>
            <h3 className="text-base font-semibold tracking-tight">{agent.name}</h3>
            <span
              className={cn(
                "ml-auto rounded-full border px-2.5 py-0.5 text-xs font-medium",
                chip[state],
              )}
            >
              {stateLabel[state]}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{agent.description}</p>

          {state === "Running" ? (
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-neutral-soft">
              <div className="h-full w-1/3 animate-[pqi-rise_1.2s_ease-in-out_infinite_alternate] rounded-full bg-primary" />
            </div>
          ) : null}

          {state === "Completed" ? (
            <div className="rise-in mt-4 rounded-lg border border-border bg-secondary/60 p-4">
              <p className="text-sm font-medium text-foreground">
                {agent.result.headline}
              </p>
              {agent.result.items?.length ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {agent.result.items.map((item) => (
                    <li
                      key={item.label}
                      className="rounded-md border border-border bg-card px-2.5 py-1 text-xs"
                    >
                      <span className="font-mono font-medium">{item.label}</span>
                      {item.value ? (
                        <span className="text-muted-foreground"> — {item.value}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
              {agent.result.bullets?.length ? (
                <ul className="mt-3 space-y-1.5">
                  {agent.result.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-sm text-muted-foreground before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-primary"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
