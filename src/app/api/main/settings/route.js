import { errorHandler } from "@/lib/utils/errorHandler";
import connectToDb from "@/lib/utils/db";
import Setting from "@/models/Setting";
import { NextResponse } from "next/server";

// GET endpoint for public access to settings
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
}


export { getSettings as GET };