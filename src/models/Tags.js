import mongoose from "mongoose";

// Tag model for content categorization and labeling
const tagSchema = new mongoose.Schema(
  {
    // Tag display name
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100
    },
    // URL-friendly identifier
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: 100
    },
    // Optional tag description
    description: {
      type: String,
      default: "",
      maxLength: 500
    }
  },
  { timestamps: true }
);

export const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);