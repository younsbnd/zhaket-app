import { NextResponse } from "next/server";
import Menu from "@/models/Menu";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { errorHandler } from "@/lib/utils/errorHandler";
import connectToDb from "@/lib/utils/db";

const getMenuBySlug = async (req, { params }) => {
  try {
    await connectToDb();

    const { slug } = await params;

    if (!slug) {
      throw createBadRequestError("Menu slug is required");
    }

    // find menu by slug
    const menu = await Menu.findOne({ slug }).lean();

    if (!menu) {
      throw createNotFoundError("Menu not found");
    }

    // return menu data
    return NextResponse.json({
      menu: {
        name: menu.name,
        slug: menu.slug,
        isEditable: menu.isEditable,
      },
      items: menu.items,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
export { getMenuBySlug as GET };
