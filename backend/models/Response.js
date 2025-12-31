import mongoose from "mongoose";

export default mongoose.model(
  "Response",
  new mongoose.Schema(
    {
      formId: { type: String, required: true },
      answers: { type: Object, required: true }
    },
    { timestamps: true }
  )
);
