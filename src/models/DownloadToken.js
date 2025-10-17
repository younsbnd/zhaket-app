import mongoose from "mongoose";

const downloadTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "فیلد user الزامی است"],
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: [true, "فیلد file الزامی است"],
  },
  token: {
    type: String,
    required: [true, "فیلد token الزامی است"],
    unique: [true, "فیلد token باید منحصر به فرد باشد"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1h",
  },
});

export default mongoose.models.DownloadToken ||
  mongoose.model("DownloadToken", downloadTokenSchema);
