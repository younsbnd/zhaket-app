import { z } from "zod";

// create schema for product
export const productValidation = z.object({
  title: z.string().min(3, "عنوان باید حداقل 3 کاراکتر باشد"),
  slug: z.string().min(3, "اسلاگ باید حداقل 3 کاراکتر باشد"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "قیمت باید بیشتر از 0 باشد"),
  discount: z.coerce.number().optional().default(0),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"], { 
    message: "وضعیت باید یکی از مقادیر پیش‌نویس، منتشر شده یا آرشیو شده باشد" 
  }).default("DRAFT"),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  category: z.string().min(1, "دسته بندی الزامی است"),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  noIndex: z.boolean().optional().default(false),
  canonical: z.string().optional(),
  files: z.array(z.string()).optional(),
});
