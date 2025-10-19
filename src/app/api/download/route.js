import connectToDb from "@/lib/utils/db";
import {
  createBadRequestError,
  createNotFoundError,
  createUnauthorizedError,
} from "@/lib/utils/errors";
import { errorHandler } from "@/lib/utils/errorHandler";
import File from "@/models/File";
import { NextResponse } from "next/server";
import fs from "fs";
import DownloadToken from "@/models/DownloadToken";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { logger } from "@/lib/utils/logger";

// download file from token
const downloadFile = async (req, res) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

    logger.info(`Download token: ${token}`);

    // check if token is valid
    if (!token) {
      throw createBadRequestError("توکن دانلود ارسال نشده است");
    }

    // get session from next-auth
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    await connectToDb();

    const tokenRecord = await DownloadToken.findOne({ token });

    // get token record
    if (!tokenRecord) {
      throw createNotFoundError("لینک دانلود معتبر نیست");
    }

    // check if token record which user
    if (tokenRecord.user.toString() !== session.user.id.toString()) {
      throw createUnauthorizedError("شما دسترسی به این لینک را ندارید");
    }

    // check if token record is expired
    if (new Date() > new Date(tokenRecord.createdAt).getTime() + 3600 * 1000) {
      throw createBadRequestError(
        "این لینک منقضی شده است. لطفاً دوباره تلاش کنید."
      );
    }

    // get file
    const file = await File.findById(tokenRecord.file);
    if (!file) {
      throw createNotFoundError("فایل مورد نظر یافت نشد");
    }

    // file.filePath already contains the full path from upload
    const filePath = file.filePath;
    const fileBuffer = fs.readFileSync(filePath);

    if (!fs.existsSync(filePath)) {
      throw createNotFoundError("فایل مورد نظر روی سرور یافت نشد");
    }

    // return file buffer as response
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": file.fileType,
        "Content-Disposition": `attachment; filename="${file.fileName}"`,
        "Content-Length": file.fileSize,
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { downloadFile as GET };
