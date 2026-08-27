import { useCallback, useEffect, useRef, useState } from "react";
import type { AgentState } from "@/lib/ai-agents";

export function useAgentSequence(count: number, stepMs = 2000, autoStart = true) {
  const [states, setStates] = useState<AgentState[]>(() =>
    Array.from({ length: count }, () => "Pending" as AgentState),
  );
  const [started, setStarted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const start = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStarted(true);
    setStates(Array.from({ length: count }, () => "Pending" as AgentState));

    for (let i = 0; i < count; i++) {
      timers.current.push(
        setTimeout(() => {
          setStates((prev) => prev.map((s, idx) => (idx === i ? "Running" : s)));
        }, i * stepMs + 400),
      );
      timers.current.push(
        setTimeout(
          () => {
            setStates((prev) => prev.map((s, idx) => (idx === i ? "Completed" : s)));
          },
          (i + 1) * stepMs + 400,
        ),
      );
    }
  }, [count, stepMs]);

  useEffect(() => {
    if (autoStart) start();
    return () => timers.current.forEach(clearTimeout);
  }, [autoStart, start]);

  const completed = states.filter((s) => s === "Completed").length;

  return {
    states,
    completed,
    started,
    progress: Math.round((completed / count) * 100),
    allDone: completed === count,
    start,
  };
}
