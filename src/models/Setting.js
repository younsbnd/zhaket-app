import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    siteId: {
      type: String,
      default: "global",
      unique: [true, "siteId باید منحصر به فرد باشد"],
      required: [true, "فیلد siteId الزامی است"],
    },
    siteName: {
      type: String,
      required: [true, "فیلد siteName الزامی است"],
      default: "فروشگاه قالب و افزونه ژاکت",
    },
    siteDescription: {
      type: String,
      required: [true, "فیلد siteDescription الزامی است"],
      default: "جدیدترین قالب‌ها و افزونه‌های وب را از ما بخواهید.",
    },
    logoUrl: {
      type: String,
    },
    faviconUrl: {
      type: String,
      default: "/icon.png",
    },
    socialLinks: {
      instagram: {
        type: String,
        default: "https://www.instagram.com/zhaketcom/",
      },
      linkedin: {
        type: String,
        default: "https://www.linkedin.com/company/zhaket/",
      },
    },

    contactInfo: {
      address: {
        type: String,
        default: "تهران, ایران",
      },
      phone: {
        type: String,
        default: "09123456789",
      },
      email: {
        type: String,
        default: "info@zhaket.com",
      },
    },
    copyrightText: {
      type: String,
      default: "تمامی حقوق برای ژاکت محفوظ است",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Setting ||
  mongoose.model("Setting", settingSchema);
