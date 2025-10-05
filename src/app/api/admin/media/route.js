// مسیر فایل: app/api/admin/media/route.js

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// تابع GET بدون تغییر باقی می‌ماند
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const folderFilter = searchParams.get("folder");
    const baseUploadDir = path.join(process.cwd(), "public", "uploads");

    try {
      await fs.access(baseUploadDir);
    } catch (e) {
      return NextResponse.json({ success: true, images: [], folders: ["all"] });
    }
    // get all folders in the uploads folder
    const allDirents = await fs.readdir(baseUploadDir, { withFileTypes: true });
    const folders = allDirents
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // get all images in the selected folder
    let images = [];

    // if the folder filter is not all, get all images in the selected folder
    if (
      folderFilter &&
      folderFilter !== "all" &&
      folders.includes(folderFilter)
    ) {
      const targetDir = path.join(baseUploadDir, folderFilter);
      const filesInDir = await fs.readdir(targetDir);
      images = filesInDir
        .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map((file) => ({
          url: `/uploads/${folderFilter}/${file}`,
          name: file,
        }));
    } else {
      // if the folder filter is all, get all images in all folders
      for (const folder of folders) {
        const targetDir = path.join(baseUploadDir, folder);
        const filesInDir = await fs.readdir(targetDir);
        const folderImages = filesInDir
          .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
          .map((file) => ({
            url: `/uploads/${folder}/${file}`,
            name: file,
          }));
        images.push(...folderImages);
      }
    }

    // sort the images by name
    images.sort((a, b) => b.name.localeCompare(a.name));

    // return the images and folders
    return NextResponse.json({
      success: true,
      images,
      folders: ["all", ...folders],
    });
  } catch (error) {
    console.error("خطا در خواندن فایل‌ها:", error);
    return NextResponse.json(
      { message: "خطا در دریافت لیست فایل‌ها." },
      { status: 500 }
    );
  }
}

//  delete image function
export async function DELETE(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { message: "آدرس فایل برای حذف الزامی است." },
        { status: 400 }
      );
    }

    // check if the file path is in the public folder
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, url);

    // check if the file path is in the public folder
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(publicDir))) {
      return NextResponse.json({ message: "دسترسی غیرمجاز." }, { status: 403 });
    }

    // delete the file from the server
    await fs.unlink(filePath);

    return NextResponse.json({
      success: true,
      message: "تصویر با موفقیت حذف شد.",
    });
  } catch (error) {
    // if the file is not found, return a 404 error
    if (error.code === "ENOENT") {
      return NextResponse.json(
        { message: "فایل مورد نظر یافت نشد." },
        { status: 404 }
      );
    }
    // if the file is not found, return a 500 error
    console.error("خطا در حذف فایل:", error);
    return NextResponse.json({ message: "خطا در حذف فایل." }, { status: 500 });
  }
}
