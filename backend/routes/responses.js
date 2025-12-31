import express from "express";
import Response from "../models/Response.js";

const router = express.Router();

router.post("/:formId", async (req, res) => {
  const response = await Response.create({
    formId: req.params.formId,
    answers: req.body
  });

  res.json(response);
});

router.get("/:formId", async (req, res) => {
  const responses = await Response.find({
    formId: req.params.formId
  });

  res.json(responses);
});

export default router;
