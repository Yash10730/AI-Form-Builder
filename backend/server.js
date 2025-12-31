import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import formRoutes from "./routes/forms.js";
import responseRoutes from "./routes/responses.js";
import aiRoutes from "./routes/ai.js";
import analyticsRoutes from "./routes/analytics.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes); // ✅ REQUIRED

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB error:", err.message));

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
