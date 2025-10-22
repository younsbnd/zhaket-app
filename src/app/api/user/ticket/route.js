import { errorHandler } from "@/lib/utils/errorHandler";
import { createTicketValidation } from "@/lib/validations/ticketValidation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { createUnauthorizedError } from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import { getNextTicketNumber } from "@/lib/utils/generateTicketNumber";
import Ticket from "@/models/Ticket";
import TicketReply from "@/models/TicketReply";
import { NextResponse } from "next/server";
import sendTicketNotification from "@/lib/utils/sendTicketNotification";
import getAdminEmails from "@/lib/utils/getAdminEmails";
import { logger } from "@/lib/utils/logger";

const createTicket = async (req) => {
  try {
    // get session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    const body = await req.json();
    // validate data
    const validation = createTicketValidation.safeParse(body);
    if (!validation.success) {
      throw validation.error;
    }
    const { title, section, reportType, description, product } =
      validation.data;

    // connect to db
    await connectToDb();
    const ticketNumber = await getNextTicketNumber();

    // create ticket
    const newTicket = await Ticket.create({
      ticketNumber,
      user: session.user.id,
      title,
      section,
      reportType,
      product: product || null,
      status: "PENDING",
    });

    // create ticket reply
    await TicketReply.create({
      ticket: newTicket._id,
      user: session.user.id,
      message: description,
    });

    // Send email notifications to all admins
    try {
      const adminEmails = await getAdminEmails();
      const populatedTicketForEmail = await Ticket.findById(newTicket._id).populate(
        "user",
        "fullName email"
      );

      // Send notification to each admin
      for (const adminEmail of adminEmails) {
        try {
          await sendTicketNotification(
            adminEmail,
            populatedTicketForEmail,
            "admin"
          );
          logger.info(
            `Ticket creation notification sent to admin: ${adminEmail}`
          );
        } catch (emailError) {
          logger.error(
            `Failed to send notification to admin ${adminEmail}:`,
            emailError
          );
        }
      }
    } catch (notificationError) {
      logger.error("Error sending admin notifications:", notificationError);
    }

    return NextResponse.json(
      { message: "تیکت با موفقیت ایجاد شد", data: newTicket },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};

const getTickets = async (req) => {
  try {
    // get session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }
    await connectToDb();

    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const statusParam = searchParams.get("status");

    const limit = 10;
    const skip = (page - 1) * limit;

    // map lowercase ids to schema enum
    const statusMap = {
      in_progress: "PENDING",
      answered: "ANSWERED",
      closed: "CLOSED",
    };

    let query = { user: session.user.id };
    if (statusParam === "open") {
      // all except closed
      query.status = { $ne: "CLOSED" };
    } else if (statusParam && statusMap[statusParam]) {
      query.status = statusMap[statusParam];
    }

    const tickets = await Ticket.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalTickets = await Ticket.countDocuments(query);
    const totalPages = Math.ceil(totalTickets / limit);

    // counts for tabs (always computed for user)
    const openCount = await Ticket.countDocuments({ user: session.user.id, status: { $ne: "CLOSED" } });
    const counts = {
      open: openCount,
      in_progress: await Ticket.countDocuments({ user: session.user.id, status: "PENDING" }),
      answered: await Ticket.countDocuments({ user: session.user.id, status: "ANSWERED" }),
      closed: await Ticket.countDocuments({ user: session.user.id, status: "CLOSED" }),
    };

    return NextResponse.json({
      success: true,
      tickets,
      pagination: {
        totalTickets,
        totalPages,
        currentPage: page,
      },
      counts,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { createTicket as POST, getTickets as GET };
