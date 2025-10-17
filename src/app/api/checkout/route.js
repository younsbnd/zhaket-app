import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { logger } from "@/lib/utils/logger";
import { zarinpalCreatePayment } from "@/lib/utils/zarinpalGateway";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { createBadRequestError, createNotFoundError, createInternalServerError } from "@/lib/utils/errors";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import { getNextSequenceValue } from "@/lib/utils/generateOrderNumber";
import OtpEmail from "@/components/emails/OtpEmail";
import { Resend } from "resend";
import { sendOrderCompletionEmail } from "@/lib/utils/sendOrderEmail";

// checkout route for logic checkout

const checkout = async (req, res) => {
  try {
    // Check if required environment variables are set
    if (!process.env.ZARINPAL_PAYMENT_CALLBACK_URL) {
      throw createInternalServerError(
        "متغیر محیطی ZARINPAL_PAYMENT_CALLBACK_URL تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    if (!process.env.ZARINPAL_PAYMENT_BASE_URL) {
      throw createInternalServerError(
        "متغیر محیطی ZARINPAL_PAYMENT_BASE_URL تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    const { useWallet } = await req.json();
    await connectToDb();

    // get session
    const session = await getServerSession(authOptions);
    if (!session)
      throw createBadRequestError(" شما اجازه دسترسی به این صفحه را ندارید");

    // get cart
    const cart = await Cart.findOne({ userId: session.user.id }).populate(
      "items"
    );

    // get user
    const user = await User.findById(session.user.id);

    // check if cart is found
    if (!cart) throw createNotFoundError("سبد خرید یافت نشد");
    if (cart.items.length === 0)
      throw createBadRequestError("سبد خرید خالی است");

    // get total price
    const totalPrice = cart.items.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    // get order items
    const orderItems = cart.items.map((item) => ({
      product: item._id,
      priceAtPurchase: item.price,
    }));

    let walletContribution = 0;
    let amountForGateway = totalPrice;

    // if user want to use wallet
    if (useWallet) {
      walletContribution = Math.min(user.balance, totalPrice);
      amountForGateway = totalPrice - walletContribution;
    }

    // create order
    let order = null;
    let responseCreatePayment = null;
    const orderNumber = await getNextSequenceValue("orderNumber");
    if (amountForGateway <= 0) {
      await User.findByIdAndUpdate(session.user.id, {
        $inc: { balance: -totalPrice },
      });

      // create order
      const walletOrder = await Order.create({
        user: session.user.id,
        items: orderItems,
        totalPrice: totalPrice,
        paymentMethod: "WALLET",
        walletUsed: totalPrice,
        status: "COMPLETED",
        orderNumber: `ZKT-${orderNumber}`,
        paymentResult: {
          status: "PAID",
          paidAt: new Date(),
        },
      });

      // create transaction
      await Transaction.create({
        user: session.user.id,
        amount: -totalPrice,
        type: "PURCHASE",
        description: "خرید از سبد خرید",
        paymentResult: {
          status: "PAID",
          paidAt: new Date(),
        },
      });

      // update cart
      await Cart.findOneAndUpdate({ userId: session.user.id }, { items: [] });

      // Send order completion email for wallet payment
      await sendOrderCompletionEmail(walletOrder._id);

      return NextResponse.json({
        success: true,
        message: "پرداخت با کیف پول با موفقیت انجام شد",
        isPaidWithWallet: true,
      });
    } else {
      // create order
      order = await Order.create({
        user: session.user.id,
        items: orderItems,
        totalPrice: totalPrice,
        paymentMethod: walletContribution > 0 ? "COMBINED" : "CARD",
        walletUsed: walletContribution,
        amountForGateway: totalPrice - walletContribution,
        orderNumber: `ZKT-${orderNumber}`,
        paymentResult: {
          status: "PENDING",
        },
      });

      // create payment
      responseCreatePayment = await zarinpalCreatePayment(
        amountForGateway,
        "خرید از سبد خرید",
        process.env.ZARINPAL_PAYMENT_CALLBACK_URL,
        order.orderNumber
      );
      logger.info("payment is :", responseCreatePayment);
      // check if payment is successful update order and transaction
      if (
        responseCreatePayment.status !== 200 ||
        responseCreatePayment.data?.data?.code !== 100
      ) {
        throw createBadRequestError("خطا در ایجاد درخواست پرداخت");
      }
      order.paymentResult.authority = responseCreatePayment.data.data.authority;
      await order.save();
    }

    // return response
    return NextResponse.json({
      success: true,
      message: "در حال انتقال به درگاه پرداخت...",
      paymentUrl:
        process.env.ZARINPAL_PAYMENT_BASE_URL +
        responseCreatePayment.data.data.authority,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { checkout as POST };




