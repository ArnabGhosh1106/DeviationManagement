/**
 * Simulated AI agent layer.
 * Change-impact agents still use mock results. Investigation agents can now be
 * derived from the live deviation input so the workflow never remains tied to
 * the original B12345 example.
 */

export type AgentState = "Pending" | "Running" | "Completed" | "Failed";

export interface AgentResult {
  headline: string;
  items?: { label: string; value?: string }[];
  bullets?: string[];
}

export interface AgentDefinition {
  key: string;
  name: string;
  description: string;
  result: AgentResult;
}

export interface DeviationAgentInput {
  deviationId?: string;
  description: string;
  equipment?: string;
  batch?: string;
  risk?: string;
  investigationNotes?: string;
}

const display = (value?: string) => value?.trim() || "Not specified";

export function buildDeviationAgents(input: DeviationAgentInput): AgentDefinition[] {
  const deviationId = display(input.deviationId);
  const batch = display(input.batch);
  const equipment = display(input.equipment);
  const risk = display(input.risk);
  const description = input.description.trim() || "No deviation description provided.";
  const notes = input.investigationNotes?.trim();

  return [
    {
      key: "understanding",
      name: "Deviation Understanding Agent",
      description: "Analyzes the current deviation description, equipment, batch information and initial classification.",
      result: {
        headline: `Current deviation ${deviationId} is being assessed with an initial risk of ${risk}.`,
        bullets: [
          `Deviation description: ${description}`,
          `Batch: ${batch}`,
          `Equipment / Area: ${equipment}`,
          ...(notes ? [`Investigation notes: ${notes}`] : []),
        ],
      },
    },
    {
      key: "historical",
      name: "Historical Investigation Agent",
      description: "Uses the current batch, equipment and deviation context when comparing historical records and patterns.",
      result: {
        headline: `Historical review is scoped to the current context for batch ${batch}.`,
        items: [
          { label: "Current deviation", value: `${deviationId} — ${description}` },
          { label: "Current batch", value: batch },
          { label: "Current equipment / area", value: equipment },
        ],
      },
    },
    {
      key: "impact",
      name: "Impact Assessment Agent",
      description: "Assesses potential impact using the current deviation details instead of a fixed sample batch.",
      result: {
        headline: `Impact assessment is based on the current deviation, batch ${batch}, and equipment ${equipment}.`,
        items: [
          { label: "Batch under assessment", value: batch },
          { label: "Equipment / Area", value: equipment },
          { label: "Initial risk", value: risk },
          ...(notes ? [{ label: "Latest evidence", value: notes }] : []),
        ],
      },
    },
    {
      key: "qa",
      name: "QA Recommendation Agent",
      description: "Generates QA recommendations using the same current deviation input shared with the other agents.",
      result: {
        headline: `QA recommendations are prepared for ${deviationId}, batch ${batch}.`,
        bullets: [
          `Confirm evidence and investigation records for: ${description}`,
          `Assess product and batch impact for ${batch}`,
          `Review equipment / area history for ${equipment}`,
          `Verify whether the initial ${risk} risk classification remains appropriate`,
          ...(notes ? ["Incorporate the latest investigation notes into QA review"] : []),
        ],
      },
    },
  ];
}

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function analyzeDeviation(input?: DeviationAgentInput): Promise<AgentResult> {
  await delay(2000);
  return buildDeviationAgents(input ?? { description: "No deviation description provided." })[0].result;
}

export async function investigateHistoricalRecords(input?: DeviationAgentInput): Promise<AgentResult> {
  await delay(2000);
  return buildDeviationAgents(input ?? { description: "No deviation description provided." })[1].result;
}

export async function assessImpact(input?: DeviationAgentInput): Promise<AgentResult> {
  await delay(2000);
  return buildDeviationAgents(input ?? { description: "No deviation description provided." })[2].result;
}

export async function generateQARecommendations(input?: DeviationAgentInput): Promise<AgentResult> {
  await delay(2000);
  return buildDeviationAgents(input ?? { description: "No deviation description provided." })[3].result;
}

export const DEVIATION_AGENTS: AgentDefinition[] = buildDeviationAgents({
  description: "No live deviation has been selected yet.",
});

export const CHANGE_IMPACT_STEPS: AgentDefinition[] = [
  { key: "request", name: "Change Request Intake", description: "Parses the change request, category and requested scope.", result: { headline: "Change request parsed and categorized as an equipment change." } },
  { key: "equipment", name: "Equipment Impact", description: "Evaluates equipment records, qualification status and interfaces.", result: { headline: "Reactor R-102 affected." } },
  { key: "sop", name: "SOP Impact", description: "Identifies procedures that require revision or review.", result: { headline: "2 SOPs require review.", items: [{ label: "SOP-102", value: "Reactor Temperature Monitoring" }, { label: "SOP-115", value: "Batch Processing Procedure" }] } },
  { key: "training", name: "Training Impact", description: "Determines training records affected by the proposed change.", result: { headline: "Operator refresher training may be required." } },
  { key: "validation", name: "Validation Impact", description: "Assesses qualification and validation activities triggered by the change.", result: { headline: "QA assessment recommended." } },
  { key: "history", name: "Historical Deviation Analysis", description: "Reviews deviations historically linked to the equipment and procedures.", result: { headline: "3 related deviations identified.", items: [{ label: "DEV-1023" }, { label: "DEV-1017" }, { label: "DEV-0982" }] } },
  { key: "overall", name: "Overall Impact Assessment", description: "Consolidates all agent findings into an overall impact rating.", result: { headline: "Overall impact rated MEDIUM." } },
];
