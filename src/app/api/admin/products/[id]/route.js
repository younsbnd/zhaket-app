import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { productValidation } from "@/lib/validations/ProductValidation";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import ProductCategory from "@/models/ProductCategory";

// get product
const getProduct = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectToDb();

    let product;
    if (isValidObjectId(id)) {
      // find product by id
      product = await Product.findById(id)
        .populate("category", "name slug")
        .populate("tags", "name slug");
      if (!product) {
        throw createNotFoundError("محصول یافت نشد.");
      }
    } else {
      // find product by slug
      product = await Product.findOne({ slug: id }).populate(
        "category",
        "name slug"
      );
      if (!product) {
        throw createNotFoundError("محصول یافت نشد.");
      }
    }
    return NextResponse.json({
      data: product,
      message: "محصول با موفقیت یافت شد.",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// update product
const updateProduct = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectToDb();
    const body = await req.json();
    const validatedData = productValidation.safeParse(body);

    if (!validatedData.success) {
      throw validatedData.error;
    }

    // validate id
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه محصول معتبر نیست.");
    }

    const product = await Product.findById(id);
    if (!product) {
      throw createNotFoundError("محصول یافت نشد.");
    }

    // check if title is unique
    const title = await Product.findOne({
      title: validatedData.data.title,
      _id: { $ne: id },
    });
    if (title) {
      throw createBadRequestError("عنوان محصول تکراری است و قبلا ثبت شده است");
    }
    // check if slug is unique
    const slug = await Product.findOne({
      slug: validatedData.data.slug,
      _id: { $ne: id },
    });
    if (slug) {
      throw createBadRequestError("نامک محصول تکراری است و قبلا ثبت شده است");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...validatedData.data,
        images: {
          url: validatedData.data.imageUrl,
          alt: validatedData.data.imageAlt,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw createNotFoundError("محصول یافت نشد.");
    }
    return NextResponse.json({ message: "محصول با موفقیت ویرایش شد." });
  } catch (error) {
    return errorHandler(error);
  }
};

// delete product
const deleteProduct = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectToDb();

    // validate id
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه محصول معتبر نیست.");
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw createNotFoundError("محصول یافت نشد.");
    }
    return NextResponse.json({
      message: "محصول با موفقیت حذف شد.",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getProduct as GET, updateProduct as PUT, deleteProduct as DELETE };
