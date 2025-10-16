import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { logger } from "@/lib/utils/logger";
import { zarinpalVerifyPayment } from "@/lib/utils/zarinpalGateway";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { createInternalServerError } from "@/lib/utils/errors";
import { sendEmailOrderCompleted } from "../../route";

// verify order with zarinpal
const verifyOrder = async (req, res) => {
  try {
    // Check if required environment variables are set
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw createInternalServerError(
        "متغیر محیطی NEXT_PUBLIC_BASE_URL تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    // get search params
    const searchParams = req.nextUrl.searchParams;
    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    // if status is not OK or authority is not found, redirect to failed page
    if (status !== "OK" || !authority) {
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL + "/cart?type=FAILED"
      );
    }

    await connectToDb();

    // get order
    const order = await Order.findOne({
      "paymentResult.authority": authority,
    });

    // check if order is found
    if (!order) {
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL + "/cart?type=FAILED"
      );
    }

    // check if order is already paid
    if (order.status === "PAID" || order.paymentResult.status === "PAID") {
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL + "/cart?type=PAID"
      );
    }

    // verify payment with zarinpal
    const responseVerifyPayment = await zarinpalVerifyPayment(
      authority,
      order.amountForGateway
    );
    logger.info("Zarinpal verify payment result", {
      responseVerifyPayment,
    });

    const { code: verifyCode, ref_id: verifyRefId } =
      responseVerifyPayment.data;

    // if payment is successful, update order status to PAID
    if (verifyCode === 100 || verifyCode === 101) {
      if (order.paymentMethod === "COMBINED") {
        if (order.walletUsed > 0) {
          await User.updateOne(
            { _id: order.user },
            { $inc: { balance: -order.walletUsed } }
          );
        }
        // create transaction
        await Transaction.create({
          user: order.user,
          amount: -order.walletUsed,
          type: "PURCHASE",
          description: "خرید از سبد خرید",
          paymentResult: {
            status: "PAID",
            paidAt: new Date(),
          },
        });
      }

      // update order status to COMPLETED
      order.status = "COMPLETED";
      order.paymentResult.status = "PAID";
      order.paymentResult.paidAt = new Date();
      order.paymentResult.refId = verifyRefId;
      await order.save();
      await Cart.findOneAndUpdate({ userId: order.user }, { items: [] });
      
      // Send order completion email
      try {
        const emailResult = await sendEmailOrderCompleted(order._id); 
      } catch (emailError) {
        return errorHandler(emailError);
      }
      
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL + "/payment?status=success"
      );
    } else {
      // if payment is failed, update order status to FAILED
      order.paymentResult.status = "FAILED";
      await order.save();
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL + "/payment?status=failed"
      );
    }
  } catch (error) {
    return errorHandler(error);
  }
};

export { verifyOrder as GET };
