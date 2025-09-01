// lib/validations/tagValidation.js
// Validation schema for 'Tag' objects, ensuring specific rules for name, slug, and description.

import { z } from 'zod';

export const tagSchema = z.object({
  // Tag name: 3-100 characters, trimmed of extra spaces
  name: z.string()
    .min(3, "نام تگ حداقل باید 3 کاراکتر باشد")
    .max(100, "نام باید کمتر از ۱۰۰ کاراکتر باشد")
    .trim(), // Removes spaces from start and end
  
  // Slug: 3-100 characters, trimmed of extra spaces
  slug: z.string()
    .min(3, "اسلاگ حداقل باید 3 کاراکتر باشد")
    .max(100, "اسلاگ باید کمتر از ۱۰۰ کاراکتر باشد")
    .trim(),
  
  // Optional description: up to 500 characters, defaults to empty string
  description: z.string()
    
    .optional()
    .default(""), // Empty string if not provided
});
