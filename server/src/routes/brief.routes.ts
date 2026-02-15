import { Router } from "express";
import { generateBrief, getBriefs } from "../controller/brief.controller";

const router = Router();

router.post("/", generateBrief);
router.get("/", getBriefs);

export default router;
