import { errorHandler } from "@/lib/utils/errorHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/route";
import { createBadRequestError, createNotFoundError, createUnauthorizedError } from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Ticket from "@/models/Ticket";
import TicketReply from "@/models/TicketReply";
import { NextResponse } from "next/server";
import sendTicketNotification from "@/lib/utils/sendTicketNotification";
import { logger } from "@/lib/utils/logger";
import User from "@/models/User";
import sendTicketSmsNotification from "@/lib/utils/sendTicketSmsNotification";
import shouldSendSmsNotification from "@/lib/utils/shouldSendSmsNotification";

// Admin reply to a ticket
const replyToTicket = async (req, { params }) => {
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
    const { message } = body;

    // Validate message
    if (!message || message.trim().length === 0) {
      throw createBadRequestError("پیام نمی‌تواند خالی باشد");
    }

    if (message.trim().length < 10) {
      throw createBadRequestError("پیام باید حداقل 10 کاراکتر باشد");
    }

    await connectToDb();

    // Check if ticket exists
    const ticket = await Ticket.findById(id).populate(
      "user",
      "email phoneNumber"
    );

    if (!ticket) {
      throw createNotFoundError("تیکت مورد نظر یافت نشد");
    }

    // Check if ticket is closed
    if (ticket.status === "CLOSED") {
      throw createBadRequestError(
        "امکان ارسال پیام برای تیکت بسته شده وجود ندارد"
      );
    }

    // Create reply
    const newReply = await TicketReply.create({
      ticket: id,
      user: session.user.id,
      message: message.trim(),
    });

    // Check if status is changing
    const statusChanged = ticket.status !== "ANSWERED";

    // Update ticket status to ANSWERED
    await Ticket.findByIdAndUpdate(id, { status: "ANSWERED" });

    // Send email notification to user only if status changed
    if (ticket.user.email && statusChanged) {
      logger.info(
        `Sending email notification to user ${ticket.user.email} for ticket ${id}`
      );
      // Get updated ticket with new status
      const updatedTicket = await Ticket.findById(id).populate(
        "user",
        "fullName email"
      );
      const emailResult = await sendTicketNotification(
        ticket.user.email,
        updatedTicket,
        "user"
      );

      logger.info(
        `Email notification sent to user ${ticket.user.email} for ticket ${id}`,
        { emailResult }
      );
    }

    // Send SMS notification to user if they don't have an email and status changed
    if (statusChanged) {
      const { shouldSendSms, phoneNumber } = shouldSendSmsNotification(
        ticket.user
      );

      if (shouldSendSms && phoneNumber) {
        try {
          const updatedTicket = await Ticket.findById(id).populate(
            "user",
            "fullName"
          );
          const smsResult = await sendTicketSmsNotification(
            phoneNumber,
            updatedTicket.user.fullName,
            updatedTicket.ticketNumber,
            updatedTicket.status
          );

          if (smsResult.success) {
            logger.info(
              `SMS notification sent to user ${ticket.user._id} for admin reply`
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

    // Populate user info
    await newReply.populate("user", "fullName email avatar role");

    return NextResponse.json(
      {
        message: "پاسخ شما با موفقیت ارسال شد",
        data: newReply,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

export { replyToTicket as POST };
