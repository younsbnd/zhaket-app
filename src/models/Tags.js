import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

// Tag model for content categorization and labeling
const tagSchema = new mongoose.Schema(
  {
    // Tag display name
    name: {
      type: String,
       required: [true, "فیلد نام الزامی می‌باشد"],
      trim: true,
       maxlength: [100, "طول نام نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"]
    },
    // URL-friendly identifier
    slug: {
      type: String,
       required: [true, "فیلد  اسلاگ  الزامی می‌باشد"],
      unique: [true,"اسلاگ نباید تکراری باشد"],
      trim: true,
      minlength: [3, "طول  اسلاگ باید حداقل 3 کاراکتر باشد"],
   maxlength: [100, "طول  اسلاگ  نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"]
    },
    // Optional tag description
    description: {
      type: String,
      default: "",
      
    }
  },
  { timestamps: true }
);

export const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);