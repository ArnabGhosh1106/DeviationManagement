/**
 * Simulated AI agent layer.
 * These functions return mock results with artificial latency so the UI can be
 * wired to a real AI service later without changing components.
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

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function analyzeDeviation(_input?: unknown): Promise<AgentResult> {
  await delay(2000);
  return {
    headline: "Deviation classified as a high-risk temperature excursion.",
    bullets: [
      "Operating range 20–25°C exceeded for 18 minutes.",
      "Event occurred during batch B12345 processing on Reactor R-102.",
    ],
  };
}

export async function investigateHistoricalRecords(_input?: unknown): Promise<AgentResult> {
  await delay(2000);
  return {
    headline: "3 similar historical deviations identified.",
    items: [
      { label: "DEV-0982", value: "Temperature excursion — Reactor R-102" },
      { label: "DEV-0917", value: "Sensor drift — Reactor R-102" },
      { label: "DEV-0872", value: "Jacket control loop instability" },
    ],
  };
}

export async function assessImpact(_input?: unknown): Promise<AgentResult> {
  await delay(2000);
  return {
    headline: "2 SOPs and 1 equipment record potentially impacted.",
    items: [
      { label: "SOP-102", value: "Reactor Temperature Monitoring" },
      { label: "SOP-115", value: "Batch Processing Procedure" },
      { label: "Reactor R-102", value: "Equipment record" },
    ],
  };
}

export async function generateQARecommendations(_input?: unknown): Promise<AgentResult> {
  await delay(2000);
  return {
    headline: "Investigation recommendations generated.",
    bullets: [
      "Review temperature sensor calibration history",
      "Assess potential batch impact",
      "Review related maintenance records",
      "Evaluate existing CAPA effectiveness",
    ],
  };
}

export const DEVIATION_AGENTS: AgentDefinition[] = [
  {
    key: "understanding",
    name: "Deviation Understanding Agent",
    description:
      "Analyzes the deviation description, equipment, batch information and initial classification.",
    result: {
      headline: "Deviation classified as a high-risk temperature excursion.",
      bullets: [
        "Operating range 20–25°C exceeded for 18 minutes.",
        "Event occurred during batch B12345 processing on Reactor R-102.",
      ],
    },
  },
  {
    key: "historical",
    name: "Historical Investigation Agent",
    description:
      "Reviews historical deviation records to identify similar events, recurring patterns and previous corrective actions.",
    result: {
      headline: "3 similar historical deviations identified.",
      items: [
        { label: "DEV-0982", value: "Temperature excursion — Reactor R-102" },
        { label: "DEV-0917", value: "Sensor drift — Reactor R-102" },
        { label: "DEV-0872", value: "Jacket control loop instability" },
      ],
    },
  },
  {
    key: "impact",
    name: "Impact Assessment Agent",
    description:
      "Identifies potentially affected SOPs, equipment, batches, training and validation activities.",
    result: {
      headline: "2 SOPs and 1 equipment record potentially impacted.",
      items: [
        { label: "SOP-102", value: "Reactor Temperature Monitoring" },
        { label: "SOP-115", value: "Batch Processing Procedure" },
        { label: "Reactor R-102", value: "Affected equipment" },
      ],
    },
  },
  {
    key: "qa",
    name: "QA Recommendation Agent",
    description:
      "Generates recommended investigation actions and CAPA suggestions for QA review.",
    result: {
      headline: "Investigation recommendations generated.",
      bullets: [
        "Review temperature sensor calibration history",
        "Assess potential batch impact",
        "Review related maintenance records",
        "Evaluate existing CAPA effectiveness",
      ],
    },
  },
];

export const CHANGE_IMPACT_STEPS: AgentDefinition[] = [
  {
    key: "request",
    name: "Change Request Intake",
    description: "Parses the change request, category and requested scope.",
    result: { headline: "Change request parsed and categorized as an equipment change." },
  },
  {
    key: "equipment",
    name: "Equipment Impact",
    description: "Evaluates equipment records, qualification status and interfaces.",
    result: { headline: "Reactor R-102 affected." },
  },
  {
    key: "sop",
    name: "SOP Impact",
    description: "Identifies procedures that require revision or review.",
    result: {
      headline: "2 SOPs require review.",
      items: [
        { label: "SOP-102", value: "Reactor Temperature Monitoring" },
        { label: "SOP-115", value: "Batch Processing Procedure" },
      ],
    },
  },
  {
    key: "training",
    name: "Training Impact",
    description: "Determines training records affected by the proposed change.",
    result: { headline: "Operator refresher training may be required." },
  },
  {
    key: "validation",
    name: "Validation Impact",
    description: "Assesses qualification and validation activities triggered by the change.",
    result: { headline: "QA assessment recommended." },
  },
  {
    key: "history",
    name: "Historical Deviation Analysis",
    description: "Reviews deviations historically linked to the equipment and procedures.",
    result: {
      headline: "3 related deviations identified.",
      items: [
        { label: "DEV-1023" },
        { label: "DEV-1017" },
        { label: "DEV-0982" },
      ],
    },
  },
  {
    key: "overall",
    name: "Overall Impact Assessment",
    description: "Consolidates all agent findings into an overall impact rating.",
    result: { headline: "Overall impact rated MEDIUM." },
  },
];
