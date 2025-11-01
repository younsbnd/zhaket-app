import { errorHandler } from "@/lib/utils/errorHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { createUnauthorizedError } from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import User from "@/models/User";
import Product from "@/models/Product";

// Get all tickets for admin
const getTickets = async (req) => {
  try {
    // Get session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    logger.info("Session", session.user.id);

    // Check if user is admin
    if (session.user.role !== "admin") {
      throw createUnauthorizedError("شما دسترسی به این بخش ندارید");
    }

    // Connect to db
    await connectToDb();

    // Get all tickets with user information
    const tickets = await Ticket.find()
      .populate("user", "fullName email phoneNumber")
      .populate("product", "title slug")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

export { getTickets as GET };