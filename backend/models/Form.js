import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "email", "radio", "checkbox"],
    required: true
  },
  required: { type: Boolean, default: false },
  options: { type: [String], default: [] }
});

export default mongoose.model(
  "Form",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      fields: [FieldSchema]
    },
    { timestamps: true }
  )
);
