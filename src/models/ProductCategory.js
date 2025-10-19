import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema(
  {
    // Basic fields
    name: {
      type: String,
      required: [true, "نام دسته بندی الزامی است"],
      minlength: [3, "نام دسته بندی باید حداقل 3 کاراکتر باشد"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "نامک دسته بندی الزامی است"],
      minlength: [3, "نامک دسته بندی باید حداقل 3 کاراکتر باشد"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    image: {
      url: {
        type: String,
      },
      alt: {
        type: String,
      },
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
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

export default mongoose.models.ProductCategory ||
  mongoose.model("ProductCategory", productCategorySchema);
