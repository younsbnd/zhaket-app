import { z } from "zod";

// Menu item validation schema (recursive)
const menuItemSchema = z.lazy(() =>
  z.object({
    title: z.string().min(1, "عنوان آیتم الزامی است").optional(),
    url: z.string().min(1, "آدرس آیتم الزامی است").optional(),
    icon: z.string().nullable().optional(),
    children: z.array(menuItemSchema).optional(),
  })
);

export const menuValidation = z.object({
  name: z.string().min(3, "نام منو باید حداقل 3 کاراکتر باشد"),
  slug: z
    .string()
    .min(3, "شناسه منو باید حداقل 3 کاراکتر باشد")
    .regex(
      /^[a-z0-9-]+$/,
      "شناسه فقط می‌تواند شامل حروف انگلیسی کوچک، اعداد و خط تیره باشد"
    ),
});

export const menuItemsValidation = z.object({
  items: z.array(menuItemSchema),
});

