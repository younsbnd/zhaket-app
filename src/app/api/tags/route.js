// app/api/tags/route.js
 
import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import { logger } from "@/lib/utils/logger";
import { validateTag, validateTagUpdate } from "@/lib/validations/tagsValidation";
import { Tag } from "@/models/Tags";
import { NextResponse } from "next/server";
 
/**
 * @route   GET /api/tags
 * @desc    Retrieve all tags from the database
 * @access  Public
 */
export async function GET() {
  try {
    await connectToDb();

    const tags = await Tag.find({}).lean();

    logger.info("Tags retrieved successfully", { count: tags.length });

    return NextResponse.json({
      success: true,
      message: "Tags retrieved successfully",
      data: tags,
      count: tags.length
    });
  } catch (error) {
    return errorHandler(error);
  }
}

/**
 * @route   POST /api/tags
 * @desc    Create a new tag
 * @access  Public
 */
export async function POST(request) {
  try {
    await connectToDb();
    const body = await request.json();

    // Validate input
    const validation = validateTag(body);
    if (!validation.success) {
      throw createBadRequestError(validation.errors.map(err => err.message).join(", "));
    }

    const { name, slug, description } = validation.data;

    // Check for duplicate slug
    const duplicate = await Tag.findOne({ slug }).lean();
    if (duplicate) {
      throw createBadRequestError("A tag with this slug already exists");
    }

    // Create and save new tag
    const newTag = await Tag.create({ name, slug, description });

    logger.info("Tag created successfully", { id: newTag._id });

    return NextResponse.json({
      success: true,
      message: "Tag created successfully",
      data: newTag
    }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
