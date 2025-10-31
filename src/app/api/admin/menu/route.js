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
      .sort({ createdAt: -1 });
    
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
 * Helper function to clean icon (remove if null/undefined/empty)
 */
const cleanIcon = (icon) => {
  if (!icon || icon === null || icon === undefined || (typeof icon === 'string' && icon.trim() === "")) {
    return undefined;
  }
  return typeof icon === 'string' ? icon.trim() : icon;
};

/**
 * Recursive function to process children and their nested children
 */
const processChildren = (children) => {
  if (!children || !Array.isArray(children)) return [];
  
  return children.map(child => {
    const childData = {
      name: child.name || "",
      path: child.path || "",
    };
    
    // Add icon only if it's valid
    const childIcon = cleanIcon(child.icon);
    if (childIcon !== undefined) {
      childData.icon = childIcon;
    }
    
    // Process nested children (level 3)
    if (child.children && Array.isArray(child.children) && child.children.length > 0) {
      childData.children = child.children.map(subChild => {
        const subChildData = {
          name: subChild.name || "",
          path: subChild.path || "",
        };
        const subIcon = cleanIcon(subChild.icon);
        if (subIcon !== undefined) {
          subChildData.icon = subIcon;
        }
        return subChildData;
      });
    }
    
    return childData;
  });
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
      if (validation.error.issues && Array.isArray(validation.error.issues)) {
        validation.error.issues.forEach(issue => {
          if (issue.path && issue.path.length > 0) {
            formattedErrors[issue.path[0]] = issue.message;
          }
        });
      }
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات ورودی نامعتبر است",
          errors: formattedErrors,
        },
        { status: 400 }
      );
    }
    const cleanedBody = validation.data;

    // Process data with defaults
    const processedData = {
      name: cleanedBody.name,
      path: cleanedBody.path,
      menuType: cleanedBody.menuType || "header-menu",
      children: processChildren(cleanedBody.children),
    };
    
    const menuIcon = cleanIcon(cleanedBody.icon);
    if (menuIcon !== undefined) {
      processedData.icon = menuIcon;
    }

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