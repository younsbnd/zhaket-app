import { z } from "zod";

// validation zod in route api for create ticket
export const createTicketValidation = z
  .object({
    title: z.string().min(3, "عنوان باید حداقل 3 کاراکتر باشد"),
    section: z.enum(["SUPPORT_ZHAKET"]),
    reportType: z.enum(["PRODUCT_SUPPORT", "OTHER_REPORT", "BUY_PRODUCT"]),
    description: z.string().min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
    product: z.string().optional(),
    status: z.enum(["OPEN", "PENDING", "ANSWERED", "CLOSED"]).default("OPEN"),
  })
  .refine(
    (data) => {
      if (data.reportType === "PRODUCT_SUPPORT") {
        return !!data.product;
      }
      return true;
    },
    {
      message: "لطفا محصول مورد نظر را انتخاب کنید",
      path: ["product"],
    }
  );
