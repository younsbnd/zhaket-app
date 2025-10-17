import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectToDb from "@/lib/utils/db";
import Order from "@/models/Order";
import { errorHandler } from "@/lib/utils/errorHandler";
import {
  createNotFoundError,
  createUnauthorizedError,
} from "@/lib/utils/errors";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

const getUserOrders = async (req, res) => {
  try {
    // get session
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }

    await connectToDb();

    // get orders
    const orders = await Order.find({
      user: session.user.id,
      status: "COMPLETED",
    }).populate("items.product");

    if (!orders) {
      throw createNotFoundError("سفارش یافت نشد");
    }
    // return response
    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getUserOrders as GET };
