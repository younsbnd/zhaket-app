import { z } from "zod";

export const productCategoryValidation = z.object({
  name: z.string().min(3, "نام دسته بندی باید حداقل 3 کاراکتر باشد"),
  slug: z.string().min(3, "نامک دسته بندی باید حداقل 3 کاراکتر باشد"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  parent: z.string().nullable().optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  noIndex: z.boolean().optional(),
  canonical: z.string().optional(),
});
