import mongoose from "mongoose";

const SourceSchema = new mongoose.Schema(
  {
    url: String,
    snippet: String,
  },
  { _id: false },
);

const BriefSchema = new mongoose.Schema(
  {
    urls: [String],
    summary: String,
    keyPoints: [String],
    conflicts: [String],
    checklist: [String],
    sources: [SourceSchema],
    skippedSources: [String], 
  },
  { timestamps: true },
);

export const BriefModel = mongoose.model("Brief", BriefSchema);
