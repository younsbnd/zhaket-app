import { z } from "zod";

// create schema for register
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, { message: "نام و نام خانوادگی حداقل باید 3 کاراکتر باشد" }),
    phoneNumber: z
      .string()
      .min(11)
      .regex(/^(09\d{9})$/)
      .optional(),
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .optional(),
    password: z
      .string()
      .min(8, { message: "رمز عبور حداقل باید 8 کاراکتر باشد" })
      .optional(),
    role: z.enum(["admin", "user"]).default("user"),
  })
  .refine(
    (data) => {
      return !!data.phoneNumber || !!data.email;
    },
    {
      message: "شماره موبایل یا ایمیل معتبر نمی باشد",
    }
  );

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
