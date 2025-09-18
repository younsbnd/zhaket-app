import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { logger } from "@/lib/utils/logger";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { createBadRequestError } from "@/lib/utils/errors";
import { registerSchema } from "@/lib/validations/userValidation";

/** 
 * @route   GET /api/admin/users
 * @desc    Retrieve all users
 * @access  Admin
 */
export async function GET() {
  try {
    await connectToDb();

    const users = await User.find({})
      .select("fullName phoneNumber email role createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    logger.info("Users retrieved successfully", { count: users.length });

    return NextResponse.json({
      success: true,
      message: "دریافت کاربران با موفقیت انجام شد",
      data: users,
      count: users.length,
    });
  } catch (error) {
    logger.error("Error retrieving users list", { error: error.message });
    return errorHandler(error);
  }
}

/** 
 * @route   POST /api/admin/users
 * @desc    Create new user with conditional field creation
 * @access  Admin
 */

export async function POST(request) {
  try {
    /** 1. Connect to MongoDB */
    await connectToDb();

    /** 2. Parse the request body */
    const body = await request.json();

    /** 3. Trim all string fields to avoid accidental spaces */
    const sanitizedBody = Object.fromEntries(
      Object.entries(body).map(([key, value]) =>
        typeof value === "string" ? [key, value.trim()] : [key, value]
      )
    );

    /** 4. Validate request body with Zod schema */
    const validation = registerSchema.safeParse(sanitizedBody);
    if (!validation.success) {
      const formattedErrors = {};
      validation.error.errors.forEach(err => {
        formattedErrors[err.path[0]] = err.message;
      });
      throw createBadRequestError("مشکل در اطلاعات ورودی  ", formattedErrors);
    }
    const cleanedBody = validation.data;

    /** 5. Ensure at least one of email or phoneNumber is provided */
    if (!cleanedBody.email && !cleanedBody.phoneNumber) {
      throw createBadRequestError(
        "ایمیل یا شماره مبایل  یک کدام باید وارد شوند",
      );
    }

    /** 6. Check for duplicate email and phoneNumber in DB */
    const duplicateErrors = {};
    if (cleanedBody.email) {
      const emailExists = await User.findOne({ email: cleanedBody.email }).lean();
      if (emailExists) duplicateErrors.email = "این ایمیل قبلا استفاده شده است ";
    }
    if (cleanedBody.phoneNumber) {
      const phoneExists = await User.findOne({ phoneNumber: cleanedBody.phoneNumber }).lean();
      if (phoneExists) duplicateErrors.phoneNumber = "شماره مبایل نباید تکراری باشد ";
    }
    if (Object.keys(duplicateErrors).length > 0) {
      throw createBadRequestError("کاربر تکراری پیدا شد", duplicateErrors);
    }

    /** 7. Prepare the new user object, avoiding null/empty values */
    const newUserData = {
      password: await bcrypt.hash(cleanedBody.password, 12), // password hashing
    };

    /**
     * Helper: add a field only if it is provided and NOT null/empty string.
     * This ensures undefined fields are not stored in MongoDB,
     * which helps avoiding E11000 duplicate key errors for null values.
     */
    const handleField = (fieldName) => {
      if (cleanedBody.hasOwnProperty(fieldName)) {
        if (cleanedBody[fieldName] !== null && cleanedBody[fieldName] !== "") {
          newUserData[fieldName] = cleanedBody[fieldName];
        }

      }
    };

    // Apply helper to all optional fields
    handleField("fullName");
    handleField("role");
    handleField("email");
    handleField("phoneNumber");

    /** 8. Save the user document into DB */
    const savedUser = await new User(newUserData).save();

    logger.info("User created successfully", { userId: savedUser._id });

    /** 9. Return success response */
    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: {
        _id: savedUser._id,
        fullName: savedUser.fullName || null,
        email: savedUser.email || null,
        phoneNumber: savedUser.phoneNumber || null,
        role: savedUser.role,
      }
    }, { status: 201 });

  } catch (error) {
    return errorHandler(error);
  }

}