import { errorHandler } from "@/lib/utils/errorHandler";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { createBadRequestError } from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import User from "@/models/User";

// get recent orders
const getRecentOrders = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createBadRequestError("لطفا ابتدا وارد شوید");
    }
    
    if (session.user.role !== "admin") {
      throw createBadRequestError("شما اجازه دسترسی به این صفحه را ندارید");
    }

    await connectToDb();

    // Get last 5 orders
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("user", "fullName email")
      .lean();

    return NextResponse.json({
      data: orders,
      message: "آخرین سفارشات با موفقیت دریافت شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getRecentOrders as GET };

