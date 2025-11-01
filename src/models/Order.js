import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "محصول الزامی است"],
    },
    priceAtPurchase: {
      type: Number,
      required: [true, "قیمت در زمان خرید الزامی است"],
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: [true, "قیمت کل الزامی است"],
    },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
    additionalNotes: {
      type: String,
    },
    amountForGateway: {
      type: Number,
    },
    orderNumber: {
      type: String,
      unique: [true, "orderNumber باید منحصر به فرد باشد"],
      sparse: true,
      required: [true, "orderNumber الزامی است"],
    },

    // payment method can be WALLET, CARD, COMBINED
    paymentMethod: {
      type: String,
      enum: ["WALLET", "CARD", "COMBINED"],
      default: "CARD",
      required: [true, "paymentMethod الزامی است"],
    },

    walletUsed: {
      type: Number,
      default: 0,
      required: [true, "walletUsed الزامی است"],
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

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
