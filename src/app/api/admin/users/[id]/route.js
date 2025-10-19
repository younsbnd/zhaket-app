import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { logger } from "@/lib/utils/logger";
import User from "@/models/User";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/validations/userValidation";
import z from "zod";
/**
 * Delete user by ID
 * @route DELETE /api/admin/users/[id]
 * @access Admin
 */
const updateSchema = registerSchema
  .extend({
    email: registerSchema.shape.email.or(z.null()),
    phoneNumber: registerSchema.shape.phoneNumber.or(z.null()),
  })
  .partial();

async function deleteUser(request, { params }) {
  try {
    await connectToDb();

    const { id } = await params;
    if (!id || !isValidObjectId(id)) {
      throw createBadRequestError("شناسه کاربر نامعتبر است");
    }

    const user = await User.findById(id);
    if (!user) {
      throw createNotFoundError("کاربر یافت نشد");
    }

    await User.findByIdAndDelete(id);
    logger.info("User deleted successfully", { userId: id });

    return NextResponse.json({
      success: true,
      message: "کاربر با موفقیت حذف شد",
    });
  } catch (error) {
    return errorHandler(error);
  }
}

/**
 * Update user by ID with conditional field creation
 * @route PUT /api/admin/users/[id]  
 * @access Admin
 */
export async function PUT(request, { params }) {
  try {
    // 1. Connect to the database
    await connectToDb();

    const { id } = await params;

    // 2. Validate MongoDB ObjectId
    if (!id || !isValidObjectId(id)) {
      throw createBadRequestError("شناسه کاربر نامعتبر است");
    }

    // 3. Parse request body
    const body = await request.json();

    // 4. Trim only string values; keep null/undefined as is
    const sanitizedBody = Object.fromEntries(
      Object.entries(body).map(([key, value]) =>
        typeof value === "string" ? [key, value.trim()] : [key, value]
      )
    );

    // 5. Validate request body with Zod schema
    const validation = updateSchema.safeParse(sanitizedBody);
    if (!validation.success) {
      const formattedErrors = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0];
        formattedErrors[field] = issue.message;
      });
      throw createBadRequestError("اطلاعات ورودی نامعتبر است", formattedErrors);
    }
    const cleanedBody = validation.data;

    // 6. Retrieve the existing user
    const existingUser = await User.findById(id).lean();
    if (!existingUser) {
      throw createNotFoundError("کاربر یافت نشد");
    }

    // 7. "At least one contact" rule (email or phoneNumber must be present)
    const finalEmail = cleanedBody.hasOwnProperty("email")
      ? cleanedBody.email
      : existingUser.email;
    const finalPhone = cleanedBody.hasOwnProperty("phoneNumber")
      ? cleanedBody.phoneNumber
      : existingUser.phoneNumber;

    if (!finalEmail && !finalPhone) {
      throw createBadRequestError(
        "حداقل یکی از ایمیل یا شماره موبایل باید وارد شود",
        { contact: "ایمیل یا شماره موبایل الزامی است" }
      );
    }

    // 8. Check for duplicate email/phone if changed
    const duplicateErrors = {};

    if (cleanedBody.email && cleanedBody.email !== existingUser.email) {
      const emailExists = await User.findOne({
        email: cleanedBody.email,
        _id: { $ne: id },
      }).lean();
      if (emailExists) {
        duplicateErrors.email = "این ایمیل قبلاً استفاده شده است";
      }
    }

    if (cleanedBody.phoneNumber && cleanedBody.phoneNumber !== existingUser.phoneNumber) {
      const phoneExists = await User.findOne({
        phoneNumber: cleanedBody.phoneNumber,
        _id: { $ne: id },
      }).lean();
      if (phoneExists) {
        duplicateErrors.phoneNumber = "این شماره موبایل قبلاً استفاده شده است";
      }
    }

    if (Object.keys(duplicateErrors).length > 0) {
      throw createBadRequestError("خطا: اطلاعات تکراری", duplicateErrors);
    }

    // 9. Prepare $set and $unset operations for MongoDB
    const updateData = {};
    const unsetData = {};

    // Helper function for all nullable fields to apply unset logic
    const handleField = (fieldName) => {
      if (cleanedBody.hasOwnProperty(fieldName)) {
        if (cleanedBody[fieldName] === null || cleanedBody[fieldName] === "") {
          unsetData[fieldName] = 1; // Remove field
        } else {
          updateData[fieldName] = cleanedBody[fieldName]; // Update field
        }
      }
    };

    // Apply to all relevant fields
    handleField("fullName");
    handleField("role");
    handleField("email");
    handleField("phoneNumber");

    // Handle password hashing
    if (cleanedBody.password) {
      updateData.password = await bcrypt.hash(cleanedBody.password, 12);
    }

    // Build final update object for MongoDB
    const updateOps = {};
    if (Object.keys(updateData).length) updateOps.$set = updateData;
    if (Object.keys(unsetData).length) updateOps.$unset = unsetData;

    // 10. Execute MongoDB update
    const updatedUser = await User.findByIdAndUpdate(id, updateOps, {
      new: true,
    })
      .select("-password")
      .lean();

    logger.info("User updated successfully", { userId: id });

    // 11. Return success response
    return NextResponse.json({
      success: true,
      message: "کاربر با موفقیت بروزرسانی شد",
      data: updatedUser,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

/**
 * Get user by ID
 * @route GET /api/admin/users/[id]
 * @access Admin
 */
async function getUserById(request, { params }) {
  try {
    await connectToDb();

    const { id } = await params;
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه کاربر نامعتبر است");
    }

    const user = await User.findById(id).select('-password').lean();
    if (!user) {
      throw createNotFoundError("کاربر یافت نشد");
    }

    return NextResponse.json({
      success: true,
      message: "اطلاعات کاربر با موفقیت دریافت شد",
      data: user,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

export { getUserById as GET };
// export { updateUser as PUT };
export { deleteUser as DELETE };
