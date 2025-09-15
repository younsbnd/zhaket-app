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
    await connectToDb();

    const body = await request.json();

    // --- Remove empty fields completely ---
    const cleanedBody = {};
    if (body.fullName?.trim()) cleanedBody.fullName = body.fullName.trim();
    if (body.email?.trim()) cleanedBody.email = body.email.trim().toLowerCase();
    if (body.phoneNumber?.trim()) cleanedBody.phoneNumber = body.phoneNumber.trim();
    if (body.password?.trim()) cleanedBody.password = body.password.trim();
    if (body.role) cleanedBody.role = body.role;

    // --- Validate using Zod Schema ---
    const validation = registerSchema.safeParse(cleanedBody);
    if (!validation.success) {
      const formattedErrors = {};
      validation.error.errors.forEach(err => {
        formattedErrors[err.path[0]] = err.message;
      });
      throw createBadRequestError("داده‌های ورودی نامعتبر است", formattedErrors);
    }

    const { fullName, email, phoneNumber, password, role } = validation.data;

    // --- Duplicate checks (email or phone) ---
    const duplicateErrors = {};
    if (email) {
      const emailExists = await User.findOne({ email }).lean();
      if (emailExists) duplicateErrors.email = "این آدرس ایمیل قبلاً استفاده شده است";
    }
    if (phoneNumber) {
      const phoneExists = await User.findOne({ phoneNumber }).lean();
      if (phoneExists) duplicateErrors.phoneNumber = "این شماره موبایل قبلاً استفاده شده است";
    }
    if (Object.keys(duplicateErrors).length > 0) {
      throw createBadRequestError("اطلاعات تکراری شناسایی شد", duplicateErrors);
    }

    // --- Hash password ---
    const hashedPassword = await bcrypt.hash(password, 12);

    // --- Create user ---
    const newUser = new User({
      fullName,
      role,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(email && { email }),
      ...(phoneNumber && { phoneNumber })
    });

    const savedUser = await newUser.save();

    logger.info("User created successfully", { userId: savedUser._id });

    return NextResponse.json({
      success: true,
      message: "کاربر با موفقیت ایجاد شد",
      data: {
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email || null,
        phoneNumber: savedUser.phoneNumber || null,
        role: savedUser.role,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt
      }
    }, { status: 201 });

  } catch (error) {
    return errorHandler(error);
  }
}