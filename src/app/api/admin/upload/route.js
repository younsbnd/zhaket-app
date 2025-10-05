// file path: app/api/admin/upload/route.js

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    // get the form data
    const formData = await req.formData();

    const file = formData.get("file");
    const folder = formData.get("folder") || "general";
    const customFilename = formData.get("customFilename");

    // if no file is selected, return an error
    if (!file) {
      return NextResponse.json(
        { message: "هیچ فایلی انتخاب نشده است." },
        { status: 400 }
      );
    }

    // clean the folder name for security
    const safeFolderName = folder.replace(/[^a-z0-9_-]/gi, "").toLowerCase();
    const uploadDir = path.join(
      process.cwd(),
      "/public/uploads",
      safeFolderName
    );

    // create the folder if it does not exist
    await fs.mkdir(uploadDir, { recursive: true });

    // convert the file to a buffer for storage
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // create a filename with custom name if provided
    let fileName;
    if (customFilename && customFilename.trim() !== "") {
      // Get the original file extension
      const originalFileName = file.name;
      const fileExtension = path.extname(originalFileName);
      
      // Create a safe version of the custom filename
      const safeCustomName = customFilename.replace(/[^a-z0-9_-]/gi, "-").toLowerCase();
      
      // Combine custom name with original extension
      fileName = `${safeCustomName}${fileExtension}`;
    } else {
      // Use default naming with timestamp if no custom name is provided
      fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    }
    
    const newPath = path.join(uploadDir, fileName);

    // write the file to the final path
    await fs.writeFile(newPath, fileBuffer);

    const publicUrl = `/uploads/${safeFolderName}/${fileName}`;

    return NextResponse.json(
      { success: true, message: "فایل با موفقیت آپلود شد.", url: publicUrl },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطای آپلود:", error);
    return NextResponse.json(
      { message: "خطا در آپلود فایل." },
      { status: 500 }
    );
  }
}
