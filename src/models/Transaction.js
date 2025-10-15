import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user الزامی است"],
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
