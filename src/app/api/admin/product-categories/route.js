import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import { productCategoryValidation } from "@/lib/validations/productCategoryValidation";
import ProductCategory from "@/models/ProductCategory";
import { NextResponse } from "next/server";

// get product categories
const getProductCategories = async () => {
  try {
    await connectToDb();
    const categories = await ProductCategory.find({})
      .sort({ createdAt: -1 })
      .populate("parent", "name slug");
    return NextResponse.json({
      data: categories,
      message: "دسته بندی ها با موفقیت دریافت شدند",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// create product category
const createProductCategory = async (req) => {
  try {
    await connectToDb();
    const body = await req.json();

    // validate data
    const validatedData = productCategoryValidation.safeParse(body);
    if (!validatedData.success) {
      throw validatedData.error;
    }

    // check if name is unique
    const name = await ProductCategory.findOne({
      name: validatedData.data.name,
    });
    if (name) {
      throw createBadRequestError(
        "نام دسته بندی تکراری است و قبلا ثبت شده است"
      );
    }

    // check if slug is unique
    const slug = await ProductCategory.findOne({
      slug: validatedData.data.slug,
    });
    if (slug) {
      throw createBadRequestError(
        "نامک دسته بندی تکراری است و قبلا ثبت شده است"
      );
    }

    // create product category
    await ProductCategory.create({
      ...validatedData.data,
      image: {
        url: validatedData.data.imageUrl,
        alt: validatedData.data.imageAlt,
      },
    });

    return NextResponse.json(
      {
        message: "دسته بندی محصول با موفقیت ایجاد شد",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

export { getProductCategories as GET, createProductCategory as POST };
