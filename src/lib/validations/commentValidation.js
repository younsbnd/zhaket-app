import { z } from "zod";

// validation for creating a new comment
export const createCommentValidation = z.object({
  text: z
    .string()
    .min(3, "متن دیدگاه باید حداقل 3 کاراکتر باشد")
    .max(1000, "متن دیدگاه باید حداکثر 1000 کاراکتر باشد"),
  product: z.string().min(1, "محصول الزامی است"),
  parentComment: z.string().optional().nullable(),
});

