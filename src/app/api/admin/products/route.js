import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import { productValidation } from "@/lib/validations/ProductValidation";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { Tag } from "@/models/Tags";
import ProductCategory from "@/models/ProductCategory";
import File from "@/models/File";


// get products
const getProducts = async () => {
  try {
    await connectToDb();
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .populate("files", "name url");
    return NextResponse.json({
      data: products,
      message: "محصولات با موفقیت دریافت شدند",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// create product
const createProduct = async (req) => {
  try {
    await connectToDb();
    const body = await req.json();

    // validate data
    const validatedData = productValidation.safeParse(body);
    if (!validatedData.success) {
      throw validatedData.error;
    }

    // check if title is unique
    const title = await Product.findOne({
      title: validatedData.data.title,
    });
    if (title) {
      throw createBadRequestError("عنوان محصول تکراری است و قبلا ثبت شده است");
    }

    // check if slug is unique
    const slug = await Product.findOne({
      slug: validatedData.data.slug,
    });
    if (slug) {
      throw createBadRequestError("نامک محصول تکراری است و قبلا ثبت شده است");
    }

    // create product
    await Product.create({
      ...validatedData.data,
      images: {
        url: validatedData.data.imageUrl,
        alt: validatedData.data.imageAlt,
      },
    });

    return NextResponse.json(
      {
        message: "محصول با موفقیت ایجاد شد",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

export { getProducts as GET, createProduct as POST };
