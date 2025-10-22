import { errorHandler } from "@/lib/utils/errorHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { createUnauthorizedError } from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Ticket from "@/models/Ticket";
import TicketReply from "@/models/TicketReply";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    // get session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    const { id } = await params;

    // connect to db
    await connectToDb();

    // get ticket
    const ticket = await Ticket.findOne({
      _id: id,
      user: session.user.id,
    }).populate("product", "title slug");

    if (!ticket) {
      return NextResponse.json(
        { error: "تیکت مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    // get ticket replies
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
}
