import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { menuValidation } from "@/lib/validations/menuValidation";
import Menu from "@/models/Menu";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

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
    
    const childIcon = cleanIcon(child.icon);
    if (childIcon !== undefined) {
      childData.icon = childIcon;
    }
    
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
 * Get single menu by ID
 * @route GET /api/admin/menu/[id]
 * @access Admin
 */
const getMenu = async (req, { params }) => {
  try {
    const { id } = await params;
    
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه منو معتبر نیست");
    }

    await connectToDb();
    
    const menu = await Menu.findById(id);
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
    
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه منو معتبر نیست");
    }

    await connectToDb();
    const body = await req.json();

    // Trim string fields
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

    // Check if menu exists
    const existingMenu = await Menu.findById(id);
    if (!existingMenu) {
      throw createNotFoundError("منو یافت نشد");
    }

    // Prepare update operation
    const updateOperation = {
      name: cleanedBody.name,
      path: cleanedBody.path,
      menuType: cleanedBody.menuType || "header-menu",
      children: processChildren(cleanedBody.children),
    };
    
    const menuIcon = cleanIcon(cleanedBody.icon);
    const updateQuery = { $set: updateOperation };
    
    if (menuIcon !== undefined) {
      updateOperation.icon = menuIcon;
    } else if (cleanedBody.hasOwnProperty('icon')) {
      // If icon was explicitly set to empty/null, remove it
      if (!updateQuery.$unset) {
        updateQuery.$unset = {};
      }
      updateQuery.$unset.icon = "";
    }

    // Update menu
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      updateQuery,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      data: updatedMenu,
      message: "منو با موفقیت ویرایش شد",
      success: true,
    });
  } catch (error) {
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
    
    if (!isValidObjectId(id)) {
      throw createBadRequestError("شناسه منو معتبر نیست");
    }

    await connectToDb();

    const menu = await Menu.findById(id);
    if (!menu) {
      throw createNotFoundError("منو یافت نشد");
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

export { getMenu as GET, updateMenu as PUT, deleteMenu as DELETE };