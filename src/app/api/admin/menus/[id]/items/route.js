import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createNotFoundError } from "@/lib/utils/errors";
import { menuItemsValidation } from "@/lib/validations/menuValidation";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";

// update entire items array
const updateMenuItems = async (req, { params }) => {
  try {
    await connectToDb();
    const { id } = await params;
    const body = await req.json();

    // validate items data
    const validatedData = menuItemsValidation.safeParse(body);
    if (!validatedData.success) {
      throw validatedData.error;
    }

    const menu = await Menu.findById(id);

    if (!menu) {
      throw createNotFoundError("منو یافت نشد");
    }

    // update menu items
    menu.items = validatedData.data.items;
    await menu.save();

    return NextResponse.json({
      data: menu,
      message: "آیتم‌های منو با موفقیت به‌روزرسانی شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { updateMenuItems as PUT };

