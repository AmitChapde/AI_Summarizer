import * as cheerio from "cheerio";

export function extractText(html: string): string {
  const $ = cheerio.load(html);

  $("script, style").remove();

 
  const text = $("p")
    .map((_, el) => $(el).text())
    .get()
    .join(" ");

  return text.replace(/\s+/g, " ").trim();
}
