// lib/validations/tagValidation.js
import { z } from 'zod';

export const tagSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  
  slug: z.string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .regex(/^[a-z0-9-_]+$/, "Slug can only contain lowercase letters, numbers, hyphens and underscores")
    .trim(),
  
  description: z.string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .default(""),
});

export const tagUpdateSchema = tagSchema.partial();

// Validation functions
export const validateTag = (data) => {
  try {
    return {
      success: true,
      data: tagSchema.parse(data),
      errors: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      errors: error.errors
    };
  }
};

export const validateTagUpdate = (data) => {
  try {
    return {
      success: true,
      data: tagUpdateSchema.parse(data),
      errors: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      errors: error.errors
    };
  }
};
