import express from "express";
import Response from "../models/Response.js";

const router = express.Router();

router.get("/:formId", async (req, res) => {
  const responses = await Response.find({
    formId: req.params.formId
  });

  const analytics = {};

  responses.forEach(r => {
    Object.entries(r.answers).forEach(([q, a]) => {
      if (!analytics[q]) analytics[q] = {};
      analytics[q][a] = (analytics[q][a] || 0) + 1;
    });
  });

  res.json({
    totalResponses: responses.length,
    analytics
  });
});

export default router;
