import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { menuValidation } from "@/lib/validations/menuValidation";
import Menu from "@/models/Menu";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

/**
 * Get single menu by ID
 * @route GET /api/admin/menu/[id]
 * @access Admin
 */
const getMenu = async (req, { params }) => {
  try {
    const { id } = await params;
    
    // Validate MongoDB ObjectId
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه منو معتبر نیست");
    }

    await connectToDb();
    
    // Find menu with populated parent
    const menu = await Menu.findById(id).populate("parent", "name slug");
    if (!menu) {
      throw createNotFoundError("منو یافت نشد");
    }
         
    return NextResponse.json({
      data: menu,
      message: "منو با موفقیت دریافت شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Update menu by ID
 * @route PUT /api/admin/menu/[id]
 * @access Admin
 */
const updateMenu = async (req, { params }) => {
  try {
    const { id } = await params;
    
    // Validate MongoDB ObjectId
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه منو معتبر نیست");
    }

    await connectToDb();
    const body = await req.json();

    console.log("📥 Received body:", JSON.stringify(body, null, 2));

    // Trim string fields to avoid accidental spaces
    const sanitizedBody = Object.fromEntries(
      Object.entries(body).map(([key, value]) =>
        typeof value === "string" ? [key, value.trim()] : [key, value]
      )
    );

    console.log("🧹 Sanitized body:", JSON.stringify(sanitizedBody, null, 2));

    // Validate request body
    const validation = menuValidation.safeParse(sanitizedBody);
    
    if (!validation.success) {
      console.error("❌ Validation failed:", validation.error);
      console.error("📋 Validation issues:", JSON.stringify(validation.error.issues, null, 2));
      
      const formattedErrors = {};
      
      // ✅ FIX: Use validation.error.issues instead of validation.error.errors
      if (validation.error.issues && Array.isArray(validation.error.issues)) {
        validation.error.issues.forEach(issue => {
          if (issue.path && issue.path.length > 0) {
            formattedErrors[issue.path[0]] = issue.message;
          }
        });
      }
      
      console.error("🔴 Formatted errors:", formattedErrors);
      throw createBadRequestError("اطلاعات ورودی نامعتبر است", formattedErrors);
    }
    
    const cleanedBody = validation.data;
    console.log("✅ Validation passed. Cleaned body:", JSON.stringify(cleanedBody, null, 2));

    // Check if menu exists
    const existingMenu = await Menu.findById(id);
    if (!existingMenu) {
      throw createNotFoundError("منو یافت نشد");
    }

    console.log("📄 Existing menu:", JSON.stringify(existingMenu, null, 2));

    // Check for duplicate name (excluding current menu)
    if (cleanedBody.name !== existingMenu.name) {
      const nameExists = await Menu.findOne({
        name: cleanedBody.name,
        _id: { $ne: id },
      }).lean();
      if (nameExists) {
        throw createBadRequestError("نام منو تکراری است و قبلا ثبت شده است");
      }
    }

    // Check for duplicate slug (excluding current menu)
    if (cleanedBody.slug !== existingMenu.slug) {
      const slugExists = await Menu.findOne({
        slug: cleanedBody.slug,
        _id: { $ne: id },
      }).lean();
      if (slugExists) {
        throw createBadRequestError("نامک منو تکراری است و قبلا ثبت شده است");
      }
    }

    // Process data with defaults
    const processedData = {
      ...cleanedBody,
      parent: cleanedBody.parent === "" || !cleanedBody.parent ? null : cleanedBody.parent,
      isActive: cleanedBody.isActive ?? true,
      target: cleanedBody.target || "_self",
      noIndex: cleanedBody.noIndex ?? false,
    };

    console.log("🔄 Processed data for update:", JSON.stringify(processedData, null, 2));

    // Update menu
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      processedData,
      { new: true, runValidators: true }
    ).populate("parent", "name slug");

    console.log("✅ Menu updated successfully:", JSON.stringify(updatedMenu, null, 2));

    return NextResponse.json({
      data: updatedMenu,
      message: "منو با موفقیت ویرایش شد",
      success: true,
    });
  } catch (error) {
    console.error("❌ Update menu error:", error);
    return errorHandler(error);
  }
};

/**
 * Delete menu by ID
 * @route DELETE /api/admin/menu/[id]
 * @access Admin
 */
const deleteMenu = async (req, { params }) => {
  try {
    const { id } = await params;
    
    // Validate MongoDB ObjectId
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه منو معتبر نیست");
    }

    await connectToDb();

    // Check if menu exists
    const menu = await Menu.findById(id);
    if (!menu) {
      throw createNotFoundError("منو یافت نشد");
    }

    // Check if menu has children
    const children = await Menu.find({ parent: id });
    if (children.length > 0) {
      throw createBadRequestError("نمی‌توان منویی که دارای زیرمنو است را حذف کرد");
    }

    // Delete menu
    await Menu.findByIdAndDelete(id);

    return NextResponse.json({
      message: "منو با موفقیت حذف شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getMenu as GET, updateMenu as PUT, deleteMenu as DELETE };
