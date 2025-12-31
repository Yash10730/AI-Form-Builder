import express from "express";
import Form from "../models/Form.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.json(form);
  } catch (err) {
    res.status(400).json({ error: "Invalid form data" });
  }
});

router.get("/", async (_, res) => {
  res.json(await Form.find().sort({ createdAt: -1 }));
});

export default router;
