import { CheckCircle2 } from "lucide-react";
import { AgentCard } from "./AgentCard";
import type { AgentDefinition, AgentState } from "@/lib/ai-agents";

export function AgentWorkflow({
  agents,
  states,
  completed,
  progress,
}: {
  agents: AgentDefinition[];
  states: AgentState[];
  completed: number;
  progress: number;
}) {
  const allDone = completed === agents.length;

  return (
    <section className="space-y-5">
      <div className="surface-card p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              AI Investigation Workflow
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Multiple specialized AI agents are analyzing the deviation.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium tabular-nums">
              {completed} of {agents.length} agents completed
            </p>
            <p className="text-xs text-muted-foreground tabular-nums">{progress}%</p>
          </div>
        </div>

        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-neutral-soft">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {allDone ? (
          <div className="rise-in mt-4 flex items-center gap-2 rounded-lg border border-success/30 bg-success-soft px-4 py-3 text-sm font-medium text-success">
            <CheckCircle2 className="size-4" />
            AI Investigation Completed
          </div>
        ) : null}
      </div>

      <div className="grid gap-4">
        {agents.map((agent, i) => (
          <AgentCard key={agent.key} index={i} agent={agent} state={states[i] ?? "Pending"} />
        ))}
      </div>
    </section>
  );
}
