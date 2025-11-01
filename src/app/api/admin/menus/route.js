import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import { menuValidation } from "@/lib/validations/menuValidation";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";

// get menus
const getMenus = async () => {
  try {
    await connectToDb();

    // get menus 
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    return NextResponse.json({
      data: menus,
      message: "منوها با موفقیت دریافت شدند",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// create menu
const createMenu = async (req) => {
  try {
    await connectToDb();
    const body = await req.json();

    // validate data
    const validatedData = menuValidation.safeParse(body);
    if (!validatedData.success) {
      throw validatedData.error;
    }

    // check if name is unique
    const existingName = await Menu.findOne({
      name: validatedData.data.name,
    });
    if (existingName) {
      throw createBadRequestError("نام منو تکراری است و قبلا ثبت شده است");
    }

    // check if slug is unique
    const existingSlug = await Menu.findOne({
      slug: validatedData.data.slug,
    });
    if (existingSlug) {
      throw createBadRequestError("شناسه منو تکراری است و قبلا ثبت شده است");
    }

    // create menu
    await Menu.create(validatedData.data);

    return NextResponse.json(
      {
        message: "منو با موفقیت ایجاد شد",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

export { getMenus as GET, createMenu as POST };

