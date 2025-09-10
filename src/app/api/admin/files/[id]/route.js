import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError, createNotFoundError } from "@/lib/utils/errors";
import File from "@/models/File";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { fileValidation } from "@/lib/validations/fileValidation";
import { logger } from "@/lib/utils/logger";
import { v4 as uuidv4 } from "uuid";

const secureUploadsDir = path.join(process.cwd(), "secure_uploads");

// get the date based path
const getDateBasedPath = () => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const datedPath = path.join(secureUploadsDir, year, month);

  // create directory if it doesn't exist
  try {
    require("fs").mkdirSync(datedPath, { recursive: true });
  } catch (error) {
    // directory already exists
  }

  return datedPath;
};

// get single file
const getFile = async (req, { params }) => {
  try {
    await connectToDb();
    const { id } = await params;

    const file = await File.findById(id).populate("product", "title slug");
    if (!file) {
      throw createNotFoundError("فایل پیدا نشد");
    }

    return NextResponse.json({
      data: file,
      message: "فایل با موفقیت دریافت شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// update file
const updateFile = async (req, { params }) => {
  try {
    await connectToDb();
    const { id } = await params;
    const body = await req.formData();

    // check if file exists
    const file = await File.findById(id);
    if (!file) {
      throw createNotFoundError("فایل پیدا نشد");
    }

    let dataToValidate;
    let newFilePath = file.filePath;
    let shouldDeleteOldFile = false;

    // if new file is uploaded
    if (body.get("file")) {
      const uploadedFile = body.get("file");
      const uniqueFileName = `${uuidv4()}${path.extname(uploadedFile.name)}`;
      const uploadPath = getDateBasedPath();
      newFilePath = path.join(uploadPath, uniqueFileName);

      // save new file
      const buffer = Buffer.from(await uploadedFile.arrayBuffer());
      await fs.writeFile(newFilePath, buffer);

      dataToValidate = {
        product: body.get("product"),
        fileName: uploadedFile.name,
        filePath: newFilePath,
        fileType: uploadedFile.type,
        fileSize: uploadedFile.size,
        version: body.get("version"),
        releaseNotes: body.get("releaseNotes"),
      };

      shouldDeleteOldFile = true;
    } else {
      // only metadata is updated
      dataToValidate = {
        product: body.get("product"),
        fileName: body.get("fileName") || file.fileName,
        filePath: body.get("filePath") || file.filePath,
        fileType: body.get("fileType") || file.fileType,
        fileSize: parseInt(body.get("fileSize")) || file.fileSize,
        version: body.get("version"),
        releaseNotes: body.get("releaseNotes"),
      };
    }

    logger.info("Request received data to validate:", { dataToValidate });

    // validate data
    const formDataValidation = fileValidation.safeParse(dataToValidate);
    if (!formDataValidation.success) {
      // delete new file if it exists
      if (shouldDeleteOldFile && newFilePath !== file.filePath) {
        try {
          await fs.unlink(newFilePath);
        } catch (error) {
          logger.warn("فایل جدید حذف نشد :", error.message);
        }
      }
      throw formDataValidation.error;
    }

    // check if product exists
    if (dataToValidate.product) {
      const product = await Product.findById(dataToValidate.product);
      if (!product) {
        // delete new file if it exists
        if (shouldDeleteOldFile && newFilePath !== file.filePath) {
          try {
            await fs.unlink(newFilePath);
          } catch (error) {
            logger.warn("فایل جدید حذف نشد :", error.message);
          }
        }
        throw createBadRequestError("محصول انتخاب شده وجود ندارد");
      }
    }

    // update file in database
    const updatedFile = await File.findByIdAndUpdate(
      id,
      {
        product: dataToValidate.product,
        fileName: dataToValidate.fileName,
        filePath: dataToValidate.filePath,
        fileType: dataToValidate.fileType,
        fileSize: dataToValidate.fileSize,
        version: dataToValidate.version,
        releaseNotes: dataToValidate.releaseNotes,
      },
      { new: true, runValidators: true }
    ).populate("product", "title slug");

    // delete old file if new file was uploaded
    if (shouldDeleteOldFile && file.filePath !== newFilePath) {
      try {
        await fs.unlink(file.filePath);
      } catch (fsError) {
        logger.warn("فایل قدیمی حذف نشد :", {
          filePath: file.filePath,
          error: fsError.message,
        });
        // continue even if old file deletion fails
      }
    }

    return NextResponse.json({
      data: updatedFile,
      message: "فایل با موفقیت بروزرسانی شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// delete file
const deleteFile = async (req, { params }) => {
  try {
    await connectToDb();
    const { id } = await params;

    // check if file exists
    const file = await File.findById(id);
    if (!file) {
      throw createNotFoundError("فایل پیدا نشد");
    }

    // delete file from the server
    await fs.unlink(file.filePath);

    // delete file from the product
    await Product.findByIdAndUpdate(file.product, {
      $pull: { files: id },
    });

    // delete file
    await File.findByIdAndDelete(id);

    return NextResponse.json({
      message: "فایل با موفقیت حذف شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getFile as GET, updateFile as PUT, deleteFile as DELETE };
