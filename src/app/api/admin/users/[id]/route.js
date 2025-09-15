import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { logger } from "@/lib/utils/logger";
import User from "@/models/User";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/validations/userValidation";

/**
 * Validation helper functions
 */
 
 
 
 

 
/**
 * Delete user by ID
 * @route DELETE /api/admin/users/[id]
 * @access Admin
 */
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
    await connectToDb();

    // ✅ اینجا await برمی‌داریم
    const { id } = params;
    if (!id || !isValidObjectId(id)) {
      throw createBadRequestError("شناسه کاربر نامعتبر است");
    }

    const body = await request.json();
    const cleanedBody = {};

    // --- Full name ---
    if (body.fullName?.trim()) {
      cleanedBody.fullName = body.fullName.trim();
    }

    // --- Email ---
    if (body.email !== undefined) {
      cleanedBody.email =
        body.email.trim() !== "" ? body.email.trim().toLowerCase() : null;
    }

    // --- Phone number ---
    if (body.phoneNumber !== undefined) {
      cleanedBody.phoneNumber =
        body.phoneNumber.trim() !== "" ? body.phoneNumber.trim() : null;
    }

    // --- Password ---
    if (body.password?.trim()) {
      cleanedBody.password = body.password.trim();
    }

    // --- Role ---
    if (body.role !== undefined) {
      cleanedBody.role = body.role;
    }

    // --- Find existing user ---
    const existingUser = await User.findById(id).lean();
    if (!existingUser) {
      throw createNotFoundError("کاربر یافت نشد");
    }

    // --- Final contact rule ---
    const finalEmail = cleanedBody.hasOwnProperty("email")
      ? cleanedBody.email
      : existingUser.email;
    const finalPhone = cleanedBody.hasOwnProperty("phoneNumber")
      ? cleanedBody.phoneNumber
      : existingUser.phoneNumber;

    if (!finalEmail && !finalPhone) {
      throw createBadRequestError(
        "حداقل یکی از فیلدهای ایمیل یا شماره موبایل باید پر باشد",
        { contact: "حداقل یکی از ایمیل یا شماره باید پر باشد" }
      );
    }

    // --- Validation ---
    const validation = registerSchema.partial().safeParse(cleanedBody);
    if (!validation.success) {
      const formattedErrors = {};
      for (const err of validation.error.errors) {
        formattedErrors[err.path[0]] = err.message;
      }
      throw createBadRequestError("داده‌های ورودی نامعتبر", formattedErrors);
    }

    // --- Duplicate checks ---
    const duplicateErrors = {};

    if (
      cleanedBody.email !== null &&
      cleanedBody.email !== undefined &&
      cleanedBody.email !== existingUser.email
    ) {
      const emailExists = await User.findOne({
        email: cleanedBody.email,
        _id: { $ne: id },
      }).lean();
      if (emailExists) {
        duplicateErrors.email = "این ایمیل قبلاً استفاده شده است";
      }
    }

    if (
      cleanedBody.phoneNumber !== null &&
      cleanedBody.phoneNumber !== undefined &&
      cleanedBody.phoneNumber !== existingUser.phoneNumber
    ) {
      const phoneExists = await User.findOne({
        phoneNumber: cleanedBody.phoneNumber,
        _id: { $ne: id },
      }).lean();
      if (phoneExists) {
        duplicateErrors.phoneNumber =
          "این شماره موبایل قبلاً استفاده شده است";
      }
    }

    if (Object.keys(duplicateErrors).length > 0) {
      throw createBadRequestError("اطلاعات تکراری شناسایی شد", duplicateErrors);
    }

    // --- Prepare $set and $unset ---
    const updateData = {};
    const unsetData = {};

    if (cleanedBody.fullName) updateData.fullName = cleanedBody.fullName;
    if (cleanedBody.role) updateData.role = cleanedBody.role;

    if (cleanedBody.hasOwnProperty("email")) {
      if (cleanedBody.email === null) {
        unsetData.email = 1; // ✅ حذف واقعی
      } else {
        updateData.email = cleanedBody.email;
      }
    }

    if (cleanedBody.hasOwnProperty("phoneNumber")) {
      if (cleanedBody.phoneNumber === null) {
        unsetData.phoneNumber = 1; // ✅ حذف واقعی
      } else {
        updateData.phoneNumber = cleanedBody.phoneNumber;
      }
    }

    if (cleanedBody.password) {
      updateData.password = await bcrypt.hash(cleanedBody.password, 12);
    }

    updateData.updatedAt = new Date();

    const updateOps = {};
    if (Object.keys(updateData).length) updateOps.$set = updateData;
    if (Object.keys(unsetData).length) updateOps.$unset = unsetData;

    const updatedUser = await User.findByIdAndUpdate(id, updateOps, {
      new: true,
    })
      .select("-password")
      .lean();

    logger.info("User updated successfully", { userId: id });

    return NextResponse.json({
      success: true,
      message: "کاربر با موفقیت به‌روزرسانی شد",
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
