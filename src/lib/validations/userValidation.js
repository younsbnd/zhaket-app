import { z } from "zod";

// create schema for register
export const registerSchema = z.object({
  fullName: z.string().min(3),
  phoneNumber: z
    .string()
    .min(11)
    .regex(/^(09\d{9})$/),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  password: z.string().min(8).optional(),
  role: z.enum(["admin", "user"]).default("user"),
});

// create schema for identifier string
const identifierStringSchema = z.string().refine(
  (value) => {
    const isMobile = value.match(/^(09\d{9})$/);
    const isEmail = value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return isMobile || isEmail;
  },
  {
    message: "شماره موبایل یا ایمیل معتبر نمی باشد",
  }
);

// create schema for identifier
export const identifierSchema = z.object({
  identifier: identifierStringSchema,
});
