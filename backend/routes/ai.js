import express from "express";

const router = express.Router();

router.post("/suggest", async (req, res) => {
  const { purpose } = req.body;

  // 🔹 MOCK AI RESPONSE (NO CLAUDE ACCOUNT REQUIRED)
  const mockResponse = [
    {
      label: "How satisfied are you with this product?",
      type: "radio",
      required: true,
      options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"]
    },
    {
      label: "What did you like the most?",
      type: "text",
      required: false
    },
    {
      label: "Any suggestions for improvement?",
      type: "text",
      required: false
    }
  ];

  console.log("AI MOCK MODE ENABLED");
  console.log("Form purpose:", purpose);

  res.json(mockResponse);
});

export default router;
