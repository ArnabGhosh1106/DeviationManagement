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
  classification?: string;
  area?: string;
  equipment?: string;
  batch?: string;
  occurredAt?: string;
  reporter?: string;
  risk?: string;
  investigationNotes?: string;
}

const display = (value?: string) => value?.trim() || "Not specified";

export function buildDeviationAgents(input: DeviationAgentInput): AgentDefinition[] {
  const deviationId = display(input.deviationId);
  const batch = display(input.batch);
  const area = display(input.area);
  const equipment = display(input.equipment);
  const classification = display(input.classification);
  const risk = display(input.risk);
  const description = input.description.trim() || "No deviation description provided.";
  const notes = input.investigationNotes?.trim();

  return [
    {
      key: "understanding",
      name: "Deviation Understanding Agent",
      description: "Analyzes the current deviation details supplied by the user.",
      result: {
        headline: `Current deviation ${deviationId} is being assessed using the submitted context.`,
        bullets: [
          `Deviation description: ${description}`,
          `Classification: ${classification}`,
          `Batch: ${batch}`,
          `Area: ${area}`,
          `Equipment: ${equipment}`,
          `Initial risk: ${risk}`,
          ...(notes ? [`Investigation notes: ${notes}`] : []),
        ],
      },
    },
    {
      key: "historical",
      name: "Historical Investigation Agent",
      description: "Scopes historical analysis using the current user-provided context.",
      result: {
        headline: `Historical review is scoped to the current context for deviation ${deviationId}.`,
        items: [
          { label: "Current deviation", value: description },
          { label: "Current batch", value: batch },
          { label: "Current area", value: area },
          { label: "Current equipment", value: equipment },
        ],
      },
    },
    {
      key: "impact",
      name: "Impact Assessment Agent",
      description: "Assesses potential impact using only the current submitted deviation details.",
      result: {
        headline: `Impact assessment is based on deviation ${deviationId} and the current submitted context.`,
        items: [
          { label: "Batch under assessment", value: batch },
          { label: "Area", value: area },
          { label: "Equipment", value: equipment },
          { label: "Initial risk", value: risk },
          ...(notes ? [{ label: "Latest evidence", value: notes }] : []),
        ],
      },
    },
    {
      key: "qa",
      name: "QA Recommendation Agent",
      description: "Prepares QA review context from the same current user input.",
      result: {
        headline: `QA recommendations are prepared from the current details for ${deviationId}.`,
        bullets: [
          `Confirm evidence and investigation records for: ${description}`,
          `Assess product and batch impact for ${batch}`,
          `Review area history for ${area}`,
          `Review equipment history for ${equipment}`,
          `Verify whether the initial ${risk} risk classification remains appropriate`,
          ...(notes ? ["Incorporate the latest investigation notes into QA review"] : []),
        ],
      },
    },
  ];
}

export async function analyzeDeviation(input: DeviationAgentInput): Promise<AgentResult> {
  return buildDeviationAgents(input)[0].result;
}

export async function investigateHistoricalRecords(input: DeviationAgentInput): Promise<AgentResult> {
  return buildDeviationAgents(input)[1].result;
}

export async function assessImpact(input: DeviationAgentInput): Promise<AgentResult> {
  return buildDeviationAgents(input)[2].result;
}

export async function generateQARecommendations(input: DeviationAgentInput): Promise<AgentResult> {
  return buildDeviationAgents(input)[3].result;
}

export const DEVIATION_AGENTS: AgentDefinition[] = buildDeviationAgents({ description: "" });

export const CHANGE_IMPACT_STEPS: AgentDefinition[] = [
  { key: "request", name: "Change Request Intake", description: "Parses the submitted change request, category and requested scope.", result: { headline: "Change request context will be derived from the selected request." } },
  { key: "equipment", name: "Equipment Impact", description: "Evaluates equipment records, qualification status and interfaces.", result: { headline: "Equipment impact depends on the selected change request." } },
  { key: "sop", name: "SOP Impact", description: "Identifies procedures that require revision or review.", result: { headline: "Procedure impact depends on linked records." } },
  { key: "training", name: "Training Impact", description: "Determines training records affected by the proposed change.", result: { headline: "Training impact depends on the submitted change scope." } },
  { key: "validation", name: "Validation Impact", description: "Assesses qualification and validation activities triggered by the change.", result: { headline: "Validation requirements depend on the submitted change." } },
  { key: "history", name: "Historical Deviation Analysis", description: "Reviews deviations historically linked to the selected context.", result: { headline: "Historical records must be supplied by the connected data source." } },
  { key: "overall", name: "Overall Impact Assessment", description: "Consolidates all available findings into an overall impact rating.", result: { headline: "Overall impact is calculated from the current change context." } },
];
