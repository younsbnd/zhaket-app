import mongoose from "mongoose";

// Schema for nested children (supports up to 3 levels deep like WordPress)
const childMenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "نام منو الزامی است"],
      minlength: [2, "نام منو باید حداقل 2 کاراکتر باشد"],
      trim: true,
    },
    path: {
      type: String,
      required: [true, "مسیر منو الزامی است"],
      trim: true,
    },
    icon: {
      type: String,
      required: false,
    },
    children: {
      type: [mongoose.Schema.Types.Mixed], // Level 3 children (nested objects)
      default: [],
    },
  },
  { _id: true }
);

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "نام منو الزامی است"],
      minlength: [2, "نام منو باید حداقل 2 کاراکتر باشد"],
      trim: true,
    },
    path: {
      type: String,
      required: [true, "مسیر منو الزامی است"],
      trim: true,
    },
    icon: {
      type: String,
      required: false,
    },
    menuType: {
      type: String,
      enum: {
        values: ["mega-menu", "header-menu", "footer-menu"],
        message: "نوع منو باید mega-menu، header-menu یا footer-menu باشد",
      },
      default: "header-menu",
    },
    // Children array - like WordPress menu structure (can have up to 3 levels)
    children: {
      type: [childMenuSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Index for better performance
menuSchema.index({ menuType: 1 });

export default mongoose.models.Menu || mongoose.model("Menu", menuSchema);