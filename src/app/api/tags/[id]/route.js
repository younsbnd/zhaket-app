// app/api/tags/[id]/route.js
 
import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { logger } from "@/lib/utils/logger";
import { validateTagUpdate } from "@/lib/validations/tagsValidation";
import { Tag } from "@/models/Tags";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

/**
 * @route   GET /api/tags/:id
 * @desc    Get a tag by ID
 * @access  Public
 */
export async function GET(request, { params }) {
  try {
    await connectToDb();

    // Validate tag ID
    if (!isValidObjectId(params.id)) {
      throw createBadRequestError("Invalid tag ID");
    }

    // Find tag by ID
    const tag = await Tag.findById(params.id).lean();
    if (!tag) {
      throw createNotFoundError("Tag not found");
    }

    // Return tag data
    return NextResponse.json({
      success: true,
      data: tag
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

    if (!isValidObjectId(params.id)) {
      throw createBadRequestError("Invalid tag ID");
    }

    const body = await request.json();

    // Validate update fields
    const validation = validateTagUpdate(body);
    if (!validation.success) {
      throw createBadRequestError(validation.errors.map(err => err.message).join(", "));
    }

    // Check if tag exists
    const existingTag = await Tag.findById(params.id).lean();
    if (!existingTag) {
      throw createNotFoundError("Tag not found");
    }

    // Check for slug duplication if slug is provided
    if (validation.data.slug) {
      const duplicateSlug = await Tag.findOne({
        slug: validation.data.slug,
        _id: { $ne: params.id }
      }).lean();
      if (duplicateSlug) {
        throw createBadRequestError("Slug is already in use");
      }
    }

    // Update tag
    const updatedTag = await Tag.findByIdAndUpdate(
      params.id,
      { ...validation.data, updatedAt: new Date() },
      { new: true }
    ).lean();

    logger.info("Tag updated successfully", { id: params.id });

    return NextResponse.json({
      success: true,
      message: "Tag updated successfully",
      data: updatedTag
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

    if (!isValidObjectId(params.id)) {
      throw createBadRequestError("Invalid tag ID");
    }

    const deletedTag = await Tag.findByIdAndDelete(params.id).lean();
    if (!deletedTag) {
      throw createNotFoundError("Tag not found");
    }

    logger.info("Tag deleted successfully", { id: params.id });

    return NextResponse.json({
      success: true,
      message: "Tag deleted successfully"
    });
  } catch (error) {
    return errorHandler(error);
  }
}
