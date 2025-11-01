import mongoose from "mongoose";

// Menu item schema
const MenuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  icon: {
    type: String,
    trim: true,
    default: null,
  },
});

// Add children field recursively
MenuItemSchema.add({
  children: [MenuItemSchema],
});

// Menu schema
const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "نام الزامی است"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "اسلاگ الزامی است"],
      unique: true,
      index: true,
    },
    isEditable: {
      type: Boolean,
      default: true,
    },
    items: [MenuItemSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);
