import { Request, Response } from "express";
import { createBrief } from "../services/brief.service";
import { BriefModel } from "../models/Brief.model";

import { success, error } from "../utils/apiResponse";

export async function generateBrief(req: Request, res: Response) {
  try {
    const { urls } = req.body;

    if (!Array.isArray(urls) || urls.length === 0) {
      return res
        .status(400)
        .json(error("Please provide at least one valid URL"));
    }

    const { saved, skipped } = await createBrief(urls);

    const clean = {
      summary: saved.summary,
      keyPoints: saved.keyPoints,
      conflicts: saved.conflicts,
      checklist: saved.checklist,
      sources: saved.sources,
      skippedSources: skipped,
    };

    res.json(success(clean));
  } catch (err: any) {
    if (err.type === "NO_VALID_SOURCES") {
      return res.status(400).json(
        error("We couldn’t extract readable content from the provided links.", {
          skippedSources: err.skipped,
          suggestion: "Try Wikipedia articles, blogs, or documentation sites.",
        }),
      );
    }

    res
      .status(500)
      .json(error("Something went wrong while generating the research brief."));
  }
}

export async function getBriefs(_req: Request, res: Response) {
  try {
    const briefs = await BriefModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-__v -_id");

    const cleanBriefs = briefs.map((brief) => ({
      summary: brief.summary,
      keyPoints: brief.keyPoints,
      conflicts: brief.conflicts,
      checklist: brief.checklist,
      sources: brief.sources,
      skippedSources: brief.skippedSources || [],
    }));

    res.json(success(cleanBriefs));
  } catch (err: any) {
    res.status(500).json(error("Failed to fetch history"));
  }
}
