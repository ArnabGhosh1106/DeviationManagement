import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const optionalText = z.string().trim().optional();

const investigationInputSchema = z.object({
  deviationId: optionalText,
  description: z.string().trim().min(1, "Deviation description is required."),
  classification: optionalText,
  area: optionalText,
  equipment: optionalText,
  batch: optionalText,
  occurredAt: optionalText,
  reporter: optionalText,
  risk: optionalText,
  investigationNotes: optionalText,
});

const investigationResultSchema = z.object({
  classification: z.string(),
  riskLevel: z.enum(["Low", "Medium", "High", "Critical"]),
  potentialRootCauses: z.array(z.string()),
  missingInformation: z.array(z.string()),
  recommendedActions: z.array(z.string()),
  summary: z.string(),
});

const qaResultSchema = z.object({
  recommendation: z.enum(["Approve", "Further Investigation Required", "Reject"]),
  rationale: z.string(),
  missingEvidence: z.array(z.string()),
  capaRecommendations: z.array(z.string()),
  closureReadiness: z.enum(["Ready", "Not Ready"]),
});

type InvestigationInput = z.infer<typeof investigationInputSchema>;

type GeminiInteraction = {
  output_text?: string | null;
  steps?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }>;
};

async function callGemini<T>(prompt: string, schema: z.ZodType<T>): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured on the server.");

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": apiKey, "Api-Revision": "2026-05-20" },
    body: JSON.stringify({ model: "gemini-3.6-flash", input: prompt, store: false }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${message}`);
  }

  const payload = (await response.json()) as GeminiInteraction;
  const text = payload.output_text ?? payload.steps
    ?.filter((step) => step.type === "model_output")
    .flatMap((step) => step.content ?? [])
    .filter((content) => content.type === "text")
    .map((content) => content.text ?? "")
    .join("\n");

  if (!text) throw new Error("Gemini returned no response text.");

  try { return schema.parse(JSON.parse(text)); }
  catch (error) { throw new Error(`Gemini returned invalid agent JSON: ${error instanceof Error ? error.message : "unknown error"}`); }
}

export const runDeviationInvestigationAgent = createServerFn({ method: "POST" })
  .inputValidator(investigationInputSchema)
  .handler(async ({ data }) => {
    const prompt = `You are a pharmaceutical deviation investigation assistant. Analyze ONLY the user-supplied deviation below. Never substitute sample batches, sample equipment, or assumed records when a field is empty. Treat empty fields as missing information.\n\nReturn ONLY valid JSON with exactly these fields:\nclassification (string), riskLevel (Low|Medium|High|Critical), potentialRootCauses (string[]), missingInformation (string[]), recommendedActions (string[]), summary (string).\n\nCurrent deviation:\n${JSON.stringify(data)}\n\nDo not claim a root cause is confirmed unless supplied evidence proves it. Clearly identify hypotheses.`;
    return callGemini(prompt, investigationResultSchema);
  });

export const runQARecommendationAgent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ deviation: investigationInputSchema, investigation: investigationResultSchema }))
  .handler(async ({ data }) => {
    const prompt = `You are an independent pharmaceutical QA reviewer. Review ONLY the current user-supplied deviation and investigation below. Do not introduce sample batch numbers, equipment, or records.\n\nReturn ONLY valid JSON with exactly these fields:\nrecommendation (Approve|Further Investigation Required|Reject), rationale (string), missingEvidence (string[]), capaRecommendations (string[]), closureReadiness (Ready|Not Ready).\n\nDeviation:\n${JSON.stringify(data.deviation)}\n\nInvestigation:\n${JSON.stringify(data.investigation)}\n\nDo not approve closure when important evidence is missing. This output is decision support and requires qualified human QA review.`;
    return callGemini(prompt, qaResultSchema);
  });

export type DeviationInvestigationInput = InvestigationInput;
export type DeviationInvestigationResult = z.infer<typeof investigationResultSchema>;
export type QARecommendationResult = z.infer<typeof qaResultSchema>;
