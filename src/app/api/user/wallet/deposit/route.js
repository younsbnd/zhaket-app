import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import connectDB from "@/lib/utils/db";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import { createBadRequestError, createNotFoundError, createInternalServerError } from "@/lib/utils/errors";
import { errorHandler } from "@/lib/utils/errorHandler";
import { logger } from "@/lib/utils/logger";
import { zarinpalCreatePayment } from "@/lib/utils/zarinpalGateway";

export async function POST(req) {
  try {
    // Check if required environment variables are set
    if (!process.env.ZARINPAL_PAYMENT_WALLET_CALLBACK_URL) {
      throw createInternalServerError(
        "متغیر محیطی ZARINPAL_PAYMENT_WALLET_CALLBACK_URL تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    if (!process.env.ZARINPAL_PAYMENT_BASE_URL) {
      throw createInternalServerError(
        "متغیر محیطی ZARINPAL_PAYMENT_BASE_URL تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    // Get authenticated user session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw createBadRequestError(" لطفا ابتدا وارد حساب کاربری خود شوید");
    }

    // Parse request body
    const { amount } = await req.json();

    // Validate amount
    if (!amount || typeof amount !== "number") {
      throw createBadRequestError("مبلغ وارد شده معتبر نیست");
    }

    if (amount < 10000) {
      throw createBadRequestError("حداقل مبلغ شارژ ۱۰,۰۰۰ تومان است");
    }

    if (amount > 100000000) {
      throw createBadRequestError("حداکثر مبلغ شارژ ۱۰۰,۰۰۰,۰۰۰ تومان است");
    }

    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findById(session.user.id);

    if (!user) {
      throw createNotFoundError("کاربر یافت نشد");
    }

    // Create payment request with Zarinpal
    const payment = await zarinpalCreatePayment(
      amount,
      "شارژ کیف پول",
      process.env.ZARINPAL_PAYMENT_WALLET_CALLBACK_URL
    );

    logger.info("payment result :", payment);

    // Check if payment creation was successful
    if (payment.status !== 200 || !payment.data?.data?.authority) {
      throw createBadRequestError("خطا در ایجاد درخواست پرداخت");
    }

    // Create transaction record with PENDING status
    // Balance will be updated only after successful payment verification
    await Transaction.create({
      userId: session.user.id,
      amount: amount,
      type: "DEPOSIT",
      description: `شارژ کیف پول به مبلغ ${new Intl.NumberFormat("fa-IR").format(amount)} تومان`,
      paymentResult: {
        authority: payment.data.data.authority,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "در حال انتقال به درگاه پرداخت...",
      data: {
        paymentUrl:
          process.env.ZARINPAL_PAYMENT_BASE_URL + payment.data.data.authority,
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
}
