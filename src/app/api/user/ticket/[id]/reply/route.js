import { errorHandler } from "@/lib/utils/errorHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/route";
import { createUnauthorizedError } from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Ticket from "@/models/Ticket";
import TicketReply from "@/models/TicketReply";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    // get session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    const { id } = params;
    const body = await req.json();
    const { message } = body;

    // validate message
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "پیام نمی‌تواند خالی باشد" },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "پیام باید حداقل 10 کاراکتر باشد" },
        { status: 400 }
      );
    }

    // connect to db
    await connectToDb();

    // check if ticket exists and belongs to user
    const ticket = await Ticket.findOne({
      _id: id,
      user: session.user.id,
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "تیکت مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    // check if ticket is closed
    if (ticket.status === "CLOSED") {
      return NextResponse.json(
        { error: "امکان ارسال پیام برای تیکت بسته شده وجود ندارد" },
        { status: 400 }
      );
    }

    // create reply
    const newReply = await TicketReply.create({
      ticket: id,
      user: session.user.id,
      message: message.trim(),
    });

    // update ticket status to PENDING (waiting for admin response)
    await Ticket.findByIdAndUpdate(id, { status: "PENDING" });

    // populate user info
    await newReply.populate("user", "name email avatar role");

    return NextResponse.json(
      { 
        message: "پاسخ شما با موفقیت ارسال شد", 
        data: newReply 
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

