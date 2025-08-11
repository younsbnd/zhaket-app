import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { logger } from "../logger";

export function errorHandler(error) {
  //   log the error
  logger.error("API Route Error Occurred", {
    message: error.message,
    stack: error.stack,
    name: error.name,
  });

  //   handle zod error
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        message: "اطلاعات ورودی نامعتبر است.",
        errors: error.flatten().fieldErrors,
      },
      { status: 400 } // Bad Request
    );
  }

  //   handle custom api error
  if (typeof error.statusCode === "number") {
    return NextResponse.json(
      { success: false, message: error.message || "خطایی رخ داده است." },
      { status: error.statusCode }
    );
  }

  //   return a detailed error for easier debugging in development mode
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred.",
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      },
      { status: 500 }
    );
  }

  //   return a generic and safe error message in production mode
  return NextResponse.json(
    {
      success: false,
      message:
        "یک خطای پیش‌بینی نشده در سرور رخ داده است. لطفاً بعداً تلاش کنید.",
    },
    { status: 500 } // Internal Server Error
  );
}
