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
 * Delete user by ID
 * @route DELETE /api/admin/users/[id]
 * @access Admin
 */
async function deleteUser(request, { params }) {
  try {
    await connectToDb();

    const { id } = params;
    if (!id || !isValidObjectId(id)) {
      throw createBadRequestError("شناسه کاربر معتبر نیست");
    }

    const user = await User.findById(id);
    if (!user) {
      throw createNotFoundError("کاربر پیدا نشد");
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
 * Update user by ID with validation
 * @route PUT /api/admin/users/[id]  
 * @access Admin
 */
async function updateUser(request, { params }) {
  try {
    await connectToDb();
    
    const { id } = await params;
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه کاربر معتبر نیست");
    }

    const body = await request.json();

    // Create partial schema for updates with contact validation
    const updateSchema = registerSchema.partial().refine(
      (data) => {
        if (data.hasOwnProperty('email') || data.hasOwnProperty('phoneNumber')) {
          return !!data.phoneNumber || !!data.email;
        }
        return true;
      },
      {
        message: "حداقل یکی از فیلدهای ایمیل یا شماره موبایل باید وجود داشته باشد",
        path: ['contact']
      }
    );

    // Validate request data
    const validationResult = updateSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.reduce((acc, error) => {
        const path = error.path.join('.');
        acc[path] = error.message;
        return acc;
      }, {});
      
      logger.warn("User update validation failed", { errors, userId: id });
      throw createBadRequestError("اطلاعات وارد شده معتبر نیست", errors);
    }

    const validatedData = validationResult.data;

    // Check user exists
    const existingUser = await User.findById(id).lean();
    if (!existingUser) {
      throw createNotFoundError("کاربر پیدا نشد");
    }

    // Verify contact info will remain after update
    const finalEmail = validatedData.email !== undefined ? validatedData.email : existingUser.email;
    const finalPhoneNumber = validatedData.phoneNumber !== undefined ? validatedData.phoneNumber : existingUser.phoneNumber;

    if (!finalEmail && !finalPhoneNumber) {
      throw createBadRequestError("حداقل یکی از فیلدهای ایمیل یا شماره موبایل باید وجود داشته باشد");
    }

    // Check email duplication
    if (validatedData.email && validatedData.email !== existingUser.email) {
      const duplicateEmail = await User.findOne({
        email: validatedData.email,
        _id: { $ne: id },
      }).lean();
      
      if (duplicateEmail) {
        throw createBadRequestError("این ایمیل قبلاً توسط کاربر دیگری استفاده شده است");
      }
    }

    // Check phone duplication
    if (validatedData.phoneNumber && validatedData.phoneNumber !== existingUser.phoneNumber) {
      const duplicatePhone = await User.findOne({
        phoneNumber: validatedData.phoneNumber,
        _id: { $ne: id },
      }).lean();
      
      if (duplicatePhone) {
        throw createBadRequestError("این شماره موبایل قبلاً توسط کاربر دیگری استفاده شده است");
      }
    }

    // Prepare update data
    const updateData = {};
    Object.keys(validatedData).forEach(key => {
      if (validatedData[key] !== undefined) {
        updateData[key] = validatedData[key];
      }
    });
    
    // Hash password if provided
    if (updateData.password) {
      const saltRounds = 12;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
      logger.info("Password updated for user", { userId: id });
    }

    updateData.updatedAt = new Date();

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password').lean();

    logger.info("User updated successfully", { 
      userId: id,
      updatedFields: Object.keys(updateData)
    });

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
      throw createBadRequestError("شناسه کاربر معتبر نیست");
    }

    const user = await User.findById(id).select('-password').lean();
    if (!user) {
      throw createNotFoundError("کاربر پیدا نشد");
    }

    logger.info("User data retrieved successfully", { userId: id });

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
export { updateUser as PUT };
export { deleteUser as DELETE };
