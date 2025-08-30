// app/api/tags/[id]/route.js

import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { logger } from "@/lib/utils/logger";
import { tagSchema } from "@/lib/validations/tagsValidation";
 
import { Tag } from "@/models/Tags";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
 
/**
 * @route   GET /api/tags/:id
 * @desc    Retrieve a tag by ID
 * @access  Public
 */
export async function GET(request, { params }) {
  try {
    await connectToDb();
    const paramsID = await params.id || "";
    // Validate tag ID format
    if (!isValidObjectId(paramsID)) {
      throw createBadRequestError("شناسه تگ معتبر نیست");
    }

    // Find tag by ID
    const tag = await Tag.findById(paramsID).lean();
    if (!tag) {
      throw createNotFoundError("تگ پیدا نشد");
    }

    // Return tag data
    return NextResponse.json({
      success: true,
      message: "تگ با موفقیت دریافت شد",
      data: tag,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

/**
 * @route   PUT /api/tags/:id
 * @desc    Update an existing tag by ID
 * @access  Public
 */
export async function PUT(request, { params }) {
  try {
    await connectToDb();
  const { id } = await params;

    // Validate tag ID format
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه تگ معتبر نیست");
    }

    const body = await request.json();

    // Validate update fields
   
   const tagValidation = tagSchema.safeParse(body);
    if (!tagValidation.success) {
      throw tagValidation.error;
    }
    // Check if tag exists
    const existingTag = await Tag.findById(params.id).lean();
    if (!existingTag) {
      throw createNotFoundError("تگ پیدا نشد");
    }

    // Check for slug duplication if slug is provided
    if (tagValidation.data.slug) {
      const duplicateSlug = await Tag.findOne({
        slug: tagValidation.data.slug,
        _id: { $ne: id },
      }).lean();
      if (duplicateSlug) {
        throw createBadRequestError("این اسلاگ قبلاً استفاده شده است");
      }
    }

    // Update tag
    const updatedTag = await Tag.findByIdAndUpdate(
     id,
      { ...tagValidation.data, updatedAt: new Date() },
      { new: true }
    ).lean();

    logger.info("Tag updated successfully", { id });

    return NextResponse.json({
      success: true,
      message: "تگ با موفقیت به‌روزرسانی شد",
      data: updatedTag,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

/**
 * @route   DELETE /api/tags/:id
 * @desc    Delete a tag by ID
 * @access  Public
 */
export async function DELETE(_, { params }) {
  try {
    await connectToDb();
    const { id } = await params;

    // Validate tag ID format
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه تگ معتبر نیست");
    }

    // Delete tag
    const deletedTag = await Tag.findByIdAndDelete(id).lean();
    if (!deletedTag) {
      throw createNotFoundError("تگ پیدا نشد");
    }

    logger.info("Tag deleted successfully", { id });

    return NextResponse.json({
      success: true,
      message: "تگ با موفقیت حذف شد",
    });
  } catch (error) {
    // Ensure error always has a message
    if (!error.message) {
      error.message = "یک خطای ناشناخته هنگام حذف تگ رخ داد.";
    }
    return errorHandler(error);
  }
}
