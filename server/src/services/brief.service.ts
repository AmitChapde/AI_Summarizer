import { fetchHtml } from "./fetch.service";
import { extractText } from "./extract.service";
import { generateResearchBrief } from "./llm.service";
import { SourceContent } from "../types/research";
import { BriefModel } from "../models/Brief.model";

export async function createBrief(urls: string[]) {
  const sources: SourceContent[] = [];
  const skipped: string[] = [];

  for (const url of urls) {
    try {
      const html = await fetchHtml(url);
      const text = extractText(html);

      if (text.length > 150) {
        sources.push({ url, content: text });
      } else {
        skipped.push(url);
      }
    } catch {
      skipped.push(url);
    }
  }

  if (sources.length === 0) {
    throw {
      type: "NO_VALID_SOURCES",
      skipped
    };
  }

  if (sources.length === 1) {
    console.warn("Low source count, proceeding with partial summary");
  }

  let result;
  try {
    result = await generateResearchBrief(sources);

    result.sources = result.sources.map(s => ({
      url: s.url,
      snippet: s.snippet.slice(0, 450)
    }));
  } catch (e) {
    console.error("LLM failed, falling back to simple summary", e);

    const fallback = sources[0];

    const saved = await BriefModel.create({
      urls,
      summary: fallback.content.slice(0, 500),
      keyPoints: ["Partial summary generated due to limited sources."],
      conflicts: [],
      checklist: [],
      sources: sources.map(s => ({
        url: s.url,
        snippet: s.content.slice(0, 450)
      }))
    });

    return { saved, skipped };
  }

  const saved = await BriefModel.create({ ...result });

  return { saved, skipped };
}
