import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    // Basic fields
    name: {
      type: String,
      required: [true, "نام منو الزامی است"],
      minlength: [2, "نام منو باید حداقل 2 کاراکتر باشد"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "نامک منو الزامی است"],
      minlength: [2, "نامک منو باید حداقل 2 کاراکتر باشد"],
      unique: true,
      trim: true,
    },
    path: {
      type: String,
      required: [true, "مسیر منو الزامی است"],
      trim: true,
    },
    icon: {
      type: String,
      default: "",
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
    target: {
      type: String,
      enum: {
        values: ["_self", "_blank"],
        message: "نوع باز کردن باید _self یا _blank باشد"
      },
      default: "_self",
    },
    menuType: {
      type: String,
      enum: {
        values: ["mega-menu", "header-menu", "footer-menu"],
        message: "نوع منو باید mega-menu، header-menu یا footer-menu باشد"
      },
      default: "header-menu",
    },
    // SEO fields
    seoTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    noIndex: {
      type: Boolean,
      default: false,
    },
    canonical: {
      type: String,
    },
  },
  { timestamps: true }
);

// Index for better performance
menuSchema.index({ isActive: 1 });
menuSchema.index({ parent: 1 });
menuSchema.index({ menuType: 1 });
menuSchema.index({ menuType: 1, isActive: 1 });

export default mongoose.models.Menu || mongoose.model("Menu", menuSchema);