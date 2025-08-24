import mongoose from "mongoose";

// otp schema
const otpSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    otp: {
      type: String,
      required: [true, "کد تایید را وارد کنید"],
    },
    expiresAt: {
      type: Date,
      required: [true, "زمان انقضا را وارد کنید"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["login", "register"],
      default: "login",
    },
  },
  { timestamps: true }
);

// otp expire after 2 minutes
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

const Otp = mongoose.models.Otp || mongoose.model("Otp", otpSchema);

export default Otp;
