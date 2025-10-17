import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import DownloadToken from "@/models/DownloadToken";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import { NextResponse } from "next/server";
import crypto from "crypto";
import Order from "@/models/Order";
import Product from "@/models/Product";
import File from "@/models/File";

const generateDownloadLink = async (req, res) => {
  try {
    const { fileId } = await req.json();

    // get session from next-auth
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw createBadRequestError("لطفا ابتدا وارد حساب کاربری خود شوید");
    }

    // check if file id is valid
    if (!fileId) {
      throw createBadRequestError("فایل انتخاب نشده است");
    }

    await connectToDb();

    // get file
    const file = await File.findById(fileId);
    if (!file) {
      throw createNotFoundError("فایل یافت نشد");
    }
    const productId = file.product;

    // check if user has purchased the file
    const order = await Order.findOne({
      user: session.user.id,
      "items.product": productId,
      status: "COMPLETED",
    });

    if (!order) {
      throw createNotFoundError("سفارش یافت نشد");
    }

    // generate random token
    const randomToken = crypto.randomBytes(32).toString("hex");

    // create download token
    await DownloadToken.create({
      user: session.user.id,
      file: fileId,
      token: randomToken,
      createdAt: new Date(),
    });

    // generate download link
    const downloadLink = `${process.env.NEXT_PUBLIC_API_BASE_URL}/download?token=${randomToken}`;

    // return response
    return NextResponse.json({
      downloadLink,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { generateDownloadLink as POST };
