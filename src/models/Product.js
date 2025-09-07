import mongoose from "mongoose";

// product schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان الزامی است"],
      minlength: [3, "عنوان باید حداقل 3 کاراکتر باشد"],
      trim: true,
      unique: [true, "عنوان تکراری است"],
    },
    slug: {
      type: String,
      required: [true, "اسلاگ الزامی است"],
      minlength: [3, "اسلاگ باید حداقل 3 کاراکتر باشد"],
      trim: true,
      unique: [true, "اسلاگ تکراری است"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "قیمت الزامی است"],
      min: [0, "قیمت باید بیشتر از 0 باشد"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      default: "DRAFT",
    },
    images: {
      url: {
        type: String,
      },
      alt: {
        type: String,
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: [true, "دسته بندی الزامی است"],
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    files: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "File",
    },

    // SEO fields
    seoTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    noIndex: {
      type: Boolean,
      default: false,
    },
    canonical: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
