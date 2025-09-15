import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      minlength: 11,
      match: /^(09\d{9})$/,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      default: null,
    },
    password: {
      type: String,
      minlength: 8,
      
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
