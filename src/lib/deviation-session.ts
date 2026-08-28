import type { DeviationInvestigationInput } from "@/lib/deviation-agents";

const CURRENT_DEVIATION_KEY = "pqi.currentDeviation";

export function saveCurrentDeviation(input: DeviationInvestigationInput) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(CURRENT_DEVIATION_KEY, JSON.stringify(input));
}

export function loadCurrentDeviation(): DeviationInvestigationInput | null {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(CURRENT_DEVIATION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as DeviationInvestigationInput;
  } catch {
    window.sessionStorage.removeItem(CURRENT_DEVIATION_KEY);
    return null;
  }
}
