// app/api/tags/route.js

import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import { logger } from "@/lib/utils/logger";
import { tagSchema } from "@/lib/validations/tagsValidation";
import { Tag } from "@/models/Tags";
import { NextResponse } from "next/server";

/**
 * @route   GET /api/tags
 * @desc    Retrieve all tags from database
 * @access  Public
 */
export async function GET() {
  try {
    await connectToDb();

    const tags = await Tag.find({}).lean();

    logger.info("Tags retrieved successfully", { count: tags.length });

    return NextResponse.json({
      success: true,
      message: "تگ‌ها با موفقیت دریافت شدند",
      data: tags,
      count: tags.length,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

/**
 * @route   POST /api/tags
 * @desc    Create a new tag in database
 * @access  Public
 */
export async function POST(request) {
  try {
    await connectToDb();

    const body = await request.json();

    // Input validation
    const tagValidation = tagSchema.safeParse(body);
    if (!tagValidation.success) {
      throw tagValidation.error;
    }

    const { name, slug, description } = tagValidation.data;

    // Check if slug already exists
    const existingTag = await Tag.findOne({ slug }).lean();
    if (existingTag) {
      throw createBadRequestError("تگی با این اسلاگ از قبل وجود دارد");
    }

    // Create and save new tag
    const newTag = await Tag.create({ name, slug, description });

    logger.info("Tag created successfully", { id: newTag._id });

    return NextResponse.json(
      {
        success: true,
        message: "تگ با موفقیت ایجاد شد",
        data: newTag,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
