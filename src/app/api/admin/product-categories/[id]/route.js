import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { productCategoryValidation } from "@/lib/validations/productCategoryValidation";
import ProductCategory from "@/models/ProductCategory";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

// get product category
const getProductCategory = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectToDb();

    // validate id
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه دسته‌ بندی معتبر نیست.");
    }
    // find category by id
    const category = await ProductCategory.findById(id);
    if (!category) {
      throw createNotFoundError("دسته‌ بندی یافت نشد.");
    }
    return NextResponse.json({
      data: category,
      message: "دسته‌ بندی با موفقیت یافت شد.",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// update product category
const updateProductCategory = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectToDb();
    const body = await req.json();
    const validatedData = productCategoryValidation.safeParse(body);

    if (!validatedData.success) {
      throw validatedData.error;
    }

    // validate id
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه دسته‌ بندی معتبر نیست.");
    }

    const category = await ProductCategory.findById(id);
    if (!category) {
      throw createNotFoundError("دسته‌ بندی یافت نشد.");
    }

    // check if name is unique
    const name = await ProductCategory.findOne({
      name: validatedData.data.name,
      _id: { $ne: id },
    });
    if (name) {
      throw createBadRequestError(
        "نام دسته بندی تکراری است و قبلا ثبت شده است"
      );
    }
    // check if slug is unique
    const slug = await ProductCategory.findOne({
      slug: validatedData.data.slug,
      _id: { $ne: id },
    });
    if (slug) {
      throw createBadRequestError(
        "نامک دسته بندی تکراری است و قبلا ثبت شده است"
      );
    }
    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      {
        ...validatedData.data,
        parent: validatedData.data.parent || null,
        image: {
          url: validatedData.data.imageUrl,
          alt: validatedData.data.imageAlt,
        },
      },
      { new: true }
    );

    if (!updatedCategory) {
      throw createNotFoundError("دسته‌ بندی یافت نشد.");
    }
    return NextResponse.json({ message: "دسته‌ بندی با موفقیت ویرایش شد." });
  } catch (error) {
    return errorHandler(error);
  }
};

// delete product category
const deleteProductCategory = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectToDb();

    // validate id
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه دسته‌ بندی معتبر نیست.");
    }

    const deletedCategory = await ProductCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      throw createNotFoundError("دسته‌ بندی یافت نشد.");
    }
    return NextResponse.json({
      message: "دسته ‌بندی با موفقیت حذف شد.",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export {
  getProductCategory as GET,
  updateProductCategory as PUT,
  deleteProductCategory as DELETE,
};
