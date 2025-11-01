import { errorHandler } from "@/lib/utils/errorHandler";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { createBadRequestError } from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Setting from "@/models/Setting";
import { NextResponse } from "next/server";

// get settings
const getSettings = async () => {
  try {
    await connectToDb();

    let settings = await Setting.findOne({ siteId: "global" });
    if (!settings) {
      settings = await Setting.create({ siteId: "global" });
    }

    return NextResponse.json({
      data: settings,
      message: "تنظیمات با موفقیت دریافت شدند",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// update settings for admin
const updateSettings = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createBadRequestError("شما اجازه دسترسی به این صفحه را ندارید");
    }

    await connectToDb();

    const body = await req.json();
    const settings = await Setting.findOneAndUpdate(
      { siteId: "global" },
      body,
      { new: true, runValidators: true, upsert: true }
    );

    return NextResponse.json({
      data: settings,
      message: "تنظیمات با موفقیت بروزرسانی شدند",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getSettings as GET, updateSettings as PUT };
