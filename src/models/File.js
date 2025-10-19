import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    required: [true, "فیلد محصول الزامی است"],
    },
    fileName: {
      type: String,
      required: [true, "فیلد نام فایل الزامی است"],
    },
    filePath: {
      type: String,
      required: [true, "فیلد مسیر فایل الزامی است"],
    },
    fileType: {
      type: String,
      required: [true, "فیلد نوع فایل الزامی است"],
    },
    fileSize: {
      type: Number,
      required: [true, "فیلد حجم فایل الزامی است"],
    },
    downloadCount: {
      type: Number,
      default: 0,
    },

    version: {
      type: Number,
      default: 0,
    },
    releaseNotes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.File || mongoose.model("File", fileSchema);
