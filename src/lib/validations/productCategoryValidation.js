import { z } from "zod";

// FAQ schema
const faqSchema = z.object({
  question: z.string().min(3, "سوال باید حداقل 3 کاراکتر باشد"),
  answer: z.string().min(3, "پاسخ باید حداقل 3 کاراکتر باشد"),
  order: z.number().optional().default(0),
});

export const productCategoryValidation = z.object({
  name: z.string().min(3, "نام دسته بندی باید حداقل 3 کاراکتر باشد"),
  slug: z.string().min(3, "نامک دسته بندی باید حداقل 3 کاراکتر باشد"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  parent: z.string().nullable().optional(),
  faqs: z.array(faqSchema).optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  noIndex: z.boolean().optional(),
  canonical: z.string().optional(),
});
