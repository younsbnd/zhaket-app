import { z } from "zod";

/**
 * Level 3 Child Menu Validation (deepest level)
 */
const level3ChildValidation = z.object({
  name: z.string().min(2, "نام منو باید حداقل 2 کاراکتر باشد"),
  path: z.string()
    .min(1, "مسیر منو الزامی است")
    .refine((val) => {
      if (val.startsWith('http://') || val.startsWith('https://')) {
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      }
      return val.trim().length > 0;
    }, "مسیر منو باید معتبر باشد"),
  icon: z.union([z.string(), z.null(), z.undefined()]).optional(),
});

/**
 * Child Menu Validation Schema (for nested children - level 2)
 */
const childMenuValidation = z.object({
  name: z.string().min(2, "نام منو باید حداقل 2 کاراکتر باشد"),
  path: z.string()
    .min(1, "مسیر منو الزامی است")
    .refine((val) => {
      if (val.startsWith('http://') || val.startsWith('https://')) {
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      }
      return val.trim().length > 0;
    }, "مسیر منو باید معتبر باشد"),
  icon: z.union([z.string(), z.null(), z.undefined()]).optional(),
  children: z.array(level3ChildValidation).optional(), // Level 3 children
});

/**
 * Menu Validation Schema
 * 
 * Defines validation rules for menu data including:
 * - Required fields: name, path
 * - Optional fields: icon, menuType, children
 * - Children array supports up to 3 levels of nesting (like WordPress)
 */
export const menuValidation = z.object({
  name: z.string().min(2, "نام منو باید حداقل 2 کاراکتر باشد"),
  path: z.string()
    .min(1, "مسیر منو الزامی است")
    .refine((val) => {
      if (val.startsWith('http://') || val.startsWith('https://')) {
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      }
      return val.trim().length > 0;
    }, "مسیر منو باید معتبر باشد"),
  icon: z.union([z.string(), z.null(), z.undefined()]).optional(),
  menuType: z.enum(["mega-menu", "header-menu", "footer-menu"]).optional(),
  children: z.array(childMenuValidation).optional(),
});