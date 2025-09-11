import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import File from "@/models/File";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

const getFiles = async () => {
  try {
    await connectToDb();

    // get files with product
    const files = await File.find({})
      .populate("product", "title slug")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      data: files,
      message: "فایل ها با موفقیت دریافت شدند",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getFiles as GET };
