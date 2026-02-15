import express from "express";
import cors from "cors";
import briefRoutes from "./routes/brief.routes";
import healthRoutes from "./routes/health.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/brief", briefRoutes);
app.use("/api/health", healthRoutes);

export default app;
