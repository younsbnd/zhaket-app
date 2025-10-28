import { z } from "zod";

/**
 * Menu Validation Schema
 * 
 * Defines validation rules for menu data including:
 * - Required fields: name, slug, path
 * - Optional fields: icon, description, parent, etc.
 * - Custom validation for path field to ensure valid URLs or paths
 * - Menu type validation with specific enum values
 * 
 * @type {z.ZodObject} Zod schema object for menu validation
 */
export const menuValidation = z.object({
  name: z.string().min(2, "نام منو باید حداقل 2 کاراکتر باشد"),
  slug: z.string().min(2, "نامک منو باید حداقل 2 کاراکتر باشد"),
  path: z.string()
    .min(1, "مسیر منو الزامی است")
    .refine((val) => {
      // Allow any non-empty string as path
      // If it looks like a URL, validate it properly
      if (val.startsWith('http://') || val.startsWith('https://')) {
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      }
      // For all other cases, just check it's not empty
      return val.trim().length > 0;
    }, "مسیر منو باید معتبر باشد"),
  icon: z.string().optional(),
  description: z.string().optional(),
  isActive: z.union([z.boolean(), z.string()]).optional(),
  parent: z.any().optional(),
  menuType: z.enum(["mega-menu", "header-menu", "footer-menu"]).optional(),
  target: z.string().optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  noIndex: z.union([z.boolean(), z.string()]).optional(),
  canonical: z.string().optional(),
});