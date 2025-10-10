import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId الزامی است"],
    },
    amount: {
      type: Number,
      required: [true, "amount الزامی است"],
    },
    type: {
      type: String,
      required: [true, "type الزامی است"],
      enum: ["DEPOSIT", "PURCHASE"],
    },
    description: {
      type: String,
      required: [true, "description الزامی است"],
    },

    // payment result
    paymentResult: {
      refId: {
        type: String,
        required: [true, "refId الزامی است"],
      },
      status: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED", "CANCELLED"],
        default: "PENDING",
      },
      authority: {
        type: String,
        unique: [true, "authority باید منحصر به فرد باشد"],
        sparse: true,
        required: [true, "authority الزامی است"],
      },
      paidAt: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
