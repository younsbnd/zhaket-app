import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import { menuValidation } from "@/lib/validations/menuValidation";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";

/**
 * Get all menus
 * @route GET /api/admin/menu
 * @access Admin
 */
const getMenus = async () => {
  try {
    await connectToDb();
    
    const menus = await Menu.find({})
      .sort({ createdAt: -1 })
      .populate("parent", "name slug");
    
    return NextResponse.json({
      data: menus,
      message: "منوها با موفقیت دریافت شدند",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

/**
 * Create new menu
 * @route POST /api/admin/menu
 * @access Admin
 */
const createMenu = async (req) => {
  try {
    await connectToDb();
    const body = await req.json();

    // Trim string fields to avoid accidental spaces
    const sanitizedBody = Object.fromEntries(
      Object.entries(body).map(([key, value]) =>
        typeof value === "string" ? [key, value.trim()] : [key, value]
      )
    );

    // Validate request body
    const validation = menuValidation.safeParse(sanitizedBody);
    if (!validation.success) {
      const formattedErrors = {};
      validation.error.errors.forEach(err => {
        formattedErrors[err.path[0]] = err.message;
      });
      throw createBadRequestError("اطلاعات ورودی نامعتبر است", formattedErrors);
    }
    const cleanedBody = validation.data;

    // Process data with defaults
    const processedData = {
      ...cleanedBody,
      parent: cleanedBody.parent === "" || !cleanedBody.parent ? null : cleanedBody.parent,
      isActive: cleanedBody.isActive ?? true,
      target: cleanedBody.target || "_self",
      noIndex: cleanedBody.noIndex ?? false,
    };

    // Create menu
    const newMenu = await Menu.create(processedData);

    return NextResponse.json({
      data: newMenu,
      message: "منو با موفقیت ایجاد شد",
      success: true,
    }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getMenus as GET, createMenu as POST };