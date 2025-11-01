import { errorHandler } from "@/lib/utils/errorHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import {
  createNotFoundError,
  createUnauthorizedError,
} from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Ticket from "@/models/Ticket";
import TicketReply from "@/models/TicketReply";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Product from "@/models/Product";
import sendTicketNotification from "@/lib/utils/sendTicketNotification";
import sendTicketSmsNotification from "@/lib/utils/sendTicketSmsNotification";
import shouldSendSmsNotification from "@/lib/utils/shouldSendSmsNotification";
import { logger } from "@/lib/utils/logger";

// Get a single ticket with all replies (for admin)
const getTicket = async (req, { params }) => {
  try {
    // Get session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      throw createUnauthorizedError("شما دسترسی به این بخش ندارید");
    }

    const { id } = await params;

    // Connect to db
    await connectToDb();

    // Get ticket with user and product information
    const ticket = await Ticket.findById(id)
      .populate("user", "fullName email phoneNumber avatar")
      .populate("product", "title slug");

    if (!ticket) {
      return NextResponse.json(
        { error: "تیکت مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    // Get ticket replies with user information
    const replies = await TicketReply.find({ ticket: id })
      .populate("user", "fullName email avatar role")
      .sort({ createdAt: 1 });

    return NextResponse.json({
      success: true,
      ticket,
      replies,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Update ticket (change status, etc.)
const updateTicket = async (req, { params }) => {
  try {
    // Get session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      throw createUnauthorizedError("شما دسترسی به این بخش ندارید");
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    // Validate status
    const validStatuses = ["OPEN", "PENDING", "ANSWERED", "CLOSED"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "وضعیت نامعتبر است" }, { status: 400 });
    }

    await connectToDb();

    // Get current ticket to check if status is changing
    const currentTicket = await Ticket.findById(id).populate(
      "user",
      "email fullName phoneNumber"
    );

    if (!currentTicket) {
      throw createNotFoundError("تیکت مورد نظر یافت نشد");
    }

    // Check if status is changing
    const statusChanged = currentTicket.status !== status;

    // Update ticket
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("user", "email fullName phoneNumber");

    // Send email notification to user if status changed
    if (statusChanged && ticket.user.email) {
      try {
        await sendTicketNotification(ticket.user.email, ticket, "user");
        logger.info(
          `Status change notification sent to user: ${ticket.user.email}`
        );
      } catch (emailError) {
        logger.error(
          `Failed to send notification to user ${ticket.user.email}:`,
          emailError
        );
      }
    }

    // Send SMS notification to user if status changed to ANSWERED and user has phone number
    if (statusChanged && status === "ANSWERED") {
      const { shouldSendSms, phoneNumber } = shouldSendSmsNotification(
        ticket.user
      );

      if (shouldSendSms && phoneNumber) {
        try {
          const smsResult = await sendTicketSmsNotification(
            phoneNumber,
            ticket.user.fullName,
            ticket.ticketNumber,
            ticket.status
          );

          if (smsResult.success) {
            logger.info(
              `SMS notification sent to user ${ticket.user._id} for status change`
            );
          } else {
            logger.error(
              `Failed to send SMS to user ${ticket.user._id}:`,
              smsResult.error
            );
          }
        } catch (smsError) {
          logger.error("Error sending SMS notification to user:", smsError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "تیکت با موفقیت بروزرسانی شد",
      data: ticket,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

// Delete a ticket
const deleteTicket = async (req, { params }) => {
  try {
    // Get session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      throw createUnauthorizedError("شما دسترسی به این بخش ندارید");
    }

    const { id } = await params;

    await connectToDb();

    // Delete ticket
    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      throw createNotFoundError("تیکت مورد نظر یافت نشد");
    }

    // Delete all replies related to this ticket
    await TicketReply.deleteMany({ ticket: id });

    return NextResponse.json({
      success: true,
      message: "تیکت با موفقیت حذف شد",
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getTicket as GET, updateTicket as PUT, deleteTicket as DELETE };
