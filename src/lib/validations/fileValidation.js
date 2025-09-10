import { z } from "zod";

// create schema for file
export const fileValidation = z.object({
  product: z.string().min(1, "محصول الزامی است"),
  fileName: z.string().min(1, "نام فایل الزامی است"),
  filePath: z.string().min(1, "مسیر فایل الزامی است"),
  fileType: z.string().min(1, "نوع فایل الزامی است"),
  fileSize: z.coerce.number().min(1, "حجم فایل باید بیشتر از 0 باشد"),
  version: z.coerce.number().optional().default(0),
  releaseNotes: z.string().optional().default(null),
});
