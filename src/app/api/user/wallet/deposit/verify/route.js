import connectToDb from "@/lib/utils/db";
import { logger } from "@/lib/utils/logger";
import { zarinpalVerifyPayment } from "@/lib/utils/zarinpalGateway";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { createInternalServerError } from "@/lib/utils/errors";

const verifyDeposit = async (req, res) => {
  try {
    // Check if required environment variables are set
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw createInternalServerError(
        "متغیر محیطی NEXT_PUBLIC_BASE_URL تعریف نشده است. لطفاً فایل .env را بررسی کنید."
      );
    }

    await connectToDb();

    const searchParams = req.nextUrl.searchParams;
    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    logger.info("Verify payment request", { authority, status });

    // If status is not OK or authority is not found, mark transaction as FAILED
    if (status !== "OK" || !authority) {
      if (authority) {
        await Transaction.updateOne(
          { "paymentResult.authority": authority },
          { $set: { "paymentResult.status": "FAILED" } }
        );
      }
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL + "/panel/wallet?type=FAILED"
      );
    }

    // Find transaction by authority
    const transaction = await Transaction.findOne({
      "paymentResult.authority": authority,
    });

    if (!transaction) {
      logger.warn("Transaction not found", { authority });
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/panel/wallet?type=FAILED&message=تراکنش یافت نشد"
      );
    }

    // Check if transaction is already paid
    if (transaction.paymentResult.status === "PAID") {
      logger.info("Transaction already paid", { authority });
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/panel/wallet?type=PAID&message=این تراکنش قبلا پرداخت شده است"
      );
    }

    // Verify payment with Zarinpal
    const payment = await zarinpalVerifyPayment(authority, transaction.amount);

    logger.info("Zarinpal verify payment result", {
      code: payment.data.code,
      refId: payment.data.ref_id,
    });

    // Payment successful (code 100 = success, code 101 = already verified)
    if (payment.data.code === 100 || payment.data.code === 101) {
      // Update user balance (only if payment is successful)
      await User.updateOne(
        { _id: transaction.userId },
        { $inc: { balance: transaction.amount } }
      );

      // Update transaction status to PAID
      transaction.paymentResult.status = "PAID";
      transaction.paymentResult.paidAt = new Date();
      transaction.paymentResult.refId = payment.data.ref_id;
      await transaction.save();

      logger.info("Payment verified successfully", {
        userId: transaction.userId,
        amount: transaction.amount,
        refId: payment.data.ref_id,
      });

      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL + "/panel/wallet?type=PAID"
      );
    } else {
      // Payment failed
      transaction.paymentResult.status = "FAILED";
      await transaction.save();

      logger.warn("Payment verification failed", {
        code: payment.data.code,
        authority,
      });

      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/panel/wallet?type=FAILED&message=تایید پرداخت ناموفق بود"
      );
    }
  } catch (error) {
    logger.error("Error in verify deposit", { error: error.message });

    // Try to redirect to wallet page with error message
    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/panel/wallet?type=FAILED&message=خطا در تایید پرداخت"
    );
  }
};

export { verifyDeposit as GET };
