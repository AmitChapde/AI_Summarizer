import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";
import { SourceContent, ResearchBriefResult } from "../types/research";
import { safeJsonParse } from "../utils/safeJson";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

async function generateContentWithFallback(
  modelName: string,
  content: string
): Promise<string> {
  try {
    const result = await model.generateContent(content);
    return result.response.text();
  } catch (error: any) {
    if (error.status === 404) {
      console.error(
        `Model ${modelName} not found. Please use a valid model.`
      );
      throw new Error(`Model ${modelName} is not available.`);
    }
    throw error;
  }
}

export async function generateResearchBrief(
  sources: SourceContent[]
): Promise<ResearchBriefResult> {
  const formattedSources = sources
    .map(
      (s, i) =>
        `Source ${i + 1} (${s.url}):\n${s.content.slice(0, 3000)}`
    )
    .join("\n\n");

  const prompt = `
You are a research analyst.

Analyze the sources and respond ONLY in JSON.

Format:
{
  "summary": string,
  "keyPoints": string[],
  "conflicts": string[],
  "checklist": string[],
  "sources": [{ "url": string, "snippet": string }]
}

Rules:
- Do NOT include markdown
- Do NOT add explanation
- Strict JSON only

Sources:
${formattedSources}
`;

  try {
    const text = await generateContentWithFallback("gemini-2.5-flash", prompt);
    const parsed = safeJsonParse<ResearchBriefResult>(text);

    if (!parsed) {
      throw new Error("Gemini JSON parsing failed");
    }

    return parsed;
  } catch (err) {
    console.error("Gemini error:", err);
    throw new Error("LLM generation failed");
  }
}

