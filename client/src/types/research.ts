export interface Source {
  url: string;
  snippet: string;
}

export interface ResearchBrief {
  summary: string;
  keyPoints: string[];
  conflicts: string[];
  checklist: string[];
  sources: Source[];
  skippedSources?: string[];
}
