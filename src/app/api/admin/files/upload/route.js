import { NextResponse } from "next/server";
import path from "path";
import File from "@/models/File";
import Product from "@/models/Product";
import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { logger } from "@/lib/utils/logger";
import { fileValidation } from "@/lib/validations/fileValidation";

const secureUploadsDir = path.join(process.cwd(), "secure_uploads");

// get the date based path
const getDateBasedPath = () => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const datedPath = path.join(secureUploadsDir, year, month);

  if (!fs.existsSync(datedPath)) {
    fs.mkdirSync(datedPath, { recursive: true });
  }

  return datedPath;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadFile = async (req) => {
  try {
    await connectToDb();

    const body = await req.formData();
    logger.info("Request received body :", { body });
    const file = body.get("file");

    const uniqueFileName = `${uuidv4()}${path.extname(file.name)}`;
    const uploadPath = getDateBasedPath();
    const filePath = path.join(uploadPath, uniqueFileName);
    logger.info("Request received file path :", { filePath });

    // check if product exists
    const product = await Product.findById(body.get("productId"));
    if (!product) {
      throw createBadRequestError("محصول انتخاب شده وجود ندارد");
    }

    //init data to validate
    const dataToValidate = {
      fileName: file.name,
      filePath: filePath,
      fileType: file.type,
      fileSize: file.size,
      product: body.get("productId"),
      version: body.get("version"),
      releaseNotes: body.get("releaseNotes"),
    };

    logger.info("Request received data to validate :", { dataToValidate });

    // validate the form data
    const formDataValidation = fileValidation.safeParse(dataToValidate);
    if (!formDataValidation.success) {
      throw formDataValidation.error;
    }

    if (!file || !dataToValidate.product) {
      throw createBadRequestError("فایل یا شناسه محصول ارسال نشده است.");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // create the file
    const newFile = await File.create({
      product: dataToValidate.product,
      fileName: file.name,
      filePath,
      fileType: file.type.split("/")[1],
      fileSize: file.size,
      version: dataToValidate.version,
      releaseNotes: dataToValidate.releaseNotes,
    });

    // add file to product's files array
    await Product.findByIdAndUpdate(
      dataToValidate.product,
      { $push: { files: newFile._id } },
      { new: true }
    );

    logger.info("File added to product successfully", { 
      productId: dataToValidate.product, 
      fileId: newFile._id 
    });

    return NextResponse.json({ success: true, file: newFile }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
};

export { uploadFile as POST };
