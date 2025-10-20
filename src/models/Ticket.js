import mongoose from "mongoose";

// ticket schema
const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: [true, "ticketNumber الزامی است"],
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user الزامی است"],
    },
    title: {
      type: String,
      required: [true, "title الزامی است"],
      trim: true,
    },
    section: {
      type: String,
      required: [true, "section الزامی است"],
      enum: ["SUPPORT_ZHAKET"],
    },
    reportType: {
      type: String,
      required: [true, "reportType الزامی است"],
      enum: ["PRODUCT_SUPPORT", "OTHER_REPORT", "BUY_PRODUCT"],
    },
    status: {
      type: String,
      enum: ["OPEN", "PENDING", "ANSWERED", "CLOSED"],
      default: "OPEN",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
