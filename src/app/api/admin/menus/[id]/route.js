import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { menuValidation } from "@/lib/validations/menuValidation";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

// get menu by id or slug
const getMenuByIdOrSlug = async (req, { params }) => {
  try {
    await connectToDb();
    const { id } = await params;

    // Try to find by ID first, if fails try by slug
    let menu;
    
    // Check if it's a valid MongoDB ObjectId (24 hex characters)
    if (isValidObjectId(id)) {
      menu = await Menu.findById(id);
    }
    
    // If not found by ID or not a valid ID, try finding by slug
    if (!menu) {
      menu = await Menu.findOne({ slug: id });
    }

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

// update menu (name and slug only)
const updateMenu = async (req, { params }) => {
  try {
    await connectToDb();
    const { id } = await params;
    const body = await req.json();

    // validate data
    const validatedData = menuValidation.safeParse(body);
    if (!validatedData.success) {
      throw validatedData.error;
    }

    const menu = await Menu.findById(id);

    if (!menu) {
      throw createNotFoundError("منو یافت نشد");
    }

    // check if menu is editable
    if (!menu.isEditable) {
      throw createBadRequestError("این منو قابل ویرایش نیست");
    }

    // check if name is unique
    if (validatedData.data.name !== menu.name) {
      const existingName = await Menu.findOne({
        name: validatedData.data.name,
        _id: { $ne: id },
      });
      if (existingName) {
        throw createBadRequestError("نام منو تکراری است");
      }
    }

    // check if slug is unique
    if (validatedData.data.slug !== menu.slug) {
      const existingSlug = await Menu.findOne({
        slug: validatedData.data.slug,
        _id: { $ne: id },
      });
      if (existingSlug) {
        throw createBadRequestError("شناسه منو تکراری است");
      }
    }

    // update menu
    menu.name = validatedData.data.name;
    menu.slug = validatedData.data.slug;
    await menu.save();

    return NextResponse.json({
      data: menu,
      message: "منو با موفقیت به‌روزرسانی شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// delete menu
const deleteMenu = async (req, { params }) => {
  try {
    await connectToDb();
    const { id } = await params;

    const menu = await Menu.findById(id);

    if (!menu) {
      throw createNotFoundError("منو یافت نشد");
    }

    // check if menu is editable
    if (!menu.isEditable) {
      throw createBadRequestError("این منو قابل حذف نیست");
    }

    await Menu.findByIdAndDelete(id);

    return NextResponse.json({
      message: "منو با موفقیت حذف شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getMenuByIdOrSlug as GET, updateMenu as PUT, deleteMenu as DELETE };