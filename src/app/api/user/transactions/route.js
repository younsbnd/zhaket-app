import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/utils/db";
import Transaction from "@/models/Transaction";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";

const getTransactions = async () => {
  try {
    // Get authenticated user session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw createBadRequestError(" شما اجازه دسترسی به این صفحه را ندارید");
    }
    await connectDB();

    // Fetch only successful user transactions, sorted by newest first
    const transactions = await Transaction.find({
      userId: session.user.id,
      "paymentResult.status": "PAID",
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getTransactions as GET };
