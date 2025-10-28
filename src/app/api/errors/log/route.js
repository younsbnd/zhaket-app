import { NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

const logError = async (request) => {
  try {
    const errorData = await request.json();

    // log the error on the server (only the server admin can see it)
    logger.error("Client-Side Error Reported", {
      ...errorData,
      serverTimestamp: new Date().toISOString(),
      ip:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "Unknown",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    logger.error("Failed to log client error", error);
    return NextResponse.json(
      { success: false, message: "Failed to log error" },
      { status: 500 }
    );
  }
};

export { logError as POST };
