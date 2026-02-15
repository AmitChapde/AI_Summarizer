export interface SourceContent {
  url: string;
  content: string;
}

export interface SourceInsight {
  url: string;
  snippet: string;
}

export interface ResearchBriefResult {
  summary: string;
  keyPoints: string[];
  conflicts: string[];
  checklist: string[];
  sources: SourceInsight[];
  skipped: string[];
}
