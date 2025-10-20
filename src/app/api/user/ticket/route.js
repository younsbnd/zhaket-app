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
    });

    // create ticket reply
    await TicketReply.create({
      ticket: newTicket._id,
      user: session.user.id,
      message: description,
    });

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
    const tickets = await Ticket.find({ user: session.user.id }).sort({
      createdAt: -1,
    });
    return NextResponse.json({
      success: true,
      tickets,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { createTicket as POST, getTickets as GET };
