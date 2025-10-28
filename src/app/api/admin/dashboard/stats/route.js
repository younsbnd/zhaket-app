import { errorHandler } from "@/lib/utils/errorHandler";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { createBadRequestError } from "@/lib/utils/errors";
import connectToDb from "@/lib/utils/db";
import User from "@/models/User";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// get dashboard stats
const getDashboardStats = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw createBadRequestError("لطفا ابتدا وارد شوید");
    }
    
    if (session.user.role !== "admin") {
      throw createBadRequestError("شما اجازه دسترسی به این صفحه را ندارید");
    }

    await connectToDb();

    // Get current date info
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    // Count active users (users created in last 30 days)
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const activeUsersCount = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Total users count
    const totalUsersCount = await User.countDocuments();

    // Get sales for current month
    const monthOrders = await Order.find({
      createdAt: { $gte: startOfMonth },
      status: { $in: ["PAID", "COMPLETED"] },
    });

    const monthSalesAmount = monthOrders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    );

    // Count completed orders
    const completedOrdersCount = await Order.countDocuments({
      status: "COMPLETED",
    });

    // Count pending orders
    const pendingOrdersCount = await Order.countDocuments({
      status: "PENDING",
    });

    // Total products count
    const totalProductsCount = await Product.countDocuments();

    // Get weekly sales data (last 7 days)
    const weeklySalesData = [];
    const daysOfWeek = [
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنج‌شنبه",
      "جمعه",
      "شنبه",
    ];

    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(now);
      dayStart.setDate(now.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      // get orders for the day
      const dayOrders = await Order.find({
        createdAt: { $gte: dayStart, $lte: dayEnd },
        status: { $in: ["PAID", "COMPLETED"] },
      });

      // get total sales for the day
      const dayTotal = dayOrders.reduce(
        (sum, order) => sum + (order.totalPrice || 0),
        0
      );

      // add sales data to the weekly sales data
      weeklySalesData.push({
        name: daysOfWeek[dayStart.getDay()],
        value: dayTotal,
        date: dayStart.toISOString(),
      });
    }

    // Get monthly sales data (last 6 months)
    const monthlySalesData = [];
    
    // Helper function to convert Gregorian date to Persian month name
    const getPersianMonthName = (date) => {
      const persianDate = new Intl.DateTimeFormat('fa-IR', {
        month: 'long',
        year: 'numeric'
      }).format(date);
      return persianDate;
    };

    // get monthly sales data
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      monthEnd.setHours(23, 59, 59, 999);

      // get orders for the month
      const monthOrders = await Order.find({
        createdAt: { $gte: monthStart, $lte: monthEnd },
        status: { $in: ["PAID", "COMPLETED"] },
      });

      // get total sales for the month
      const monthTotal = monthOrders.reduce(
        (sum, order) => sum + (order.totalPrice || 0),
        0
      );

      // add sales data to the monthly sales data
      monthlySalesData.push({
        name: getPersianMonthName(monthStart),
        value: monthTotal,
        date: monthStart.toISOString(),
      });
    }

    // return response
    return NextResponse.json({
      data: {
        stats: {
          activeUsers: activeUsersCount,
          totalUsers: totalUsersCount,
          monthSales: monthSalesAmount,
          completedOrders: completedOrdersCount,
          pendingOrders: pendingOrdersCount,
          totalProducts: totalProductsCount,
        },
        weeklySales: weeklySalesData,
        monthlySales: monthlySalesData,
      },
      message: "آمار داشبورد با موفقیت دریافت شد",
      success: true,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getDashboardStats as GET };

