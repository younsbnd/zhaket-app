import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import Otp from "@/models/Otp";
import User from "@/models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendOtpMeli } from "@/lib/utils/sendOtpMeli";
import sendEmailOtp from "@/lib/utils/sendEmailOtp";
import { logger } from "@/lib/utils/logger";

const sendResetOtp = async (req) => {
  try {
    const body = await req.json();
    const { identifier } = body;

    // Simple validation
    if (!identifier || identifier.trim().length === 0) {
      throw createBadRequestError("شناسه الزامی است");
    }

    await connectToDb();

    // check if user exists
    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    if (!user) {
      throw createBadRequestError(
        "کاربری با این ایمیل یا شماره موبایل یافت نشد"
      );
    }

    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);

    // check if otp is already sent
    const existingOtp = await Otp.findOne({
      $or: [{ phoneNumber: identifier }, { email: identifier }],
      expiresAt: { $gt: new Date() },
      type: "reset-password"
    });

    const identifierType = identifier.includes("@") ? "email" : "phoneNumber";

    if (existingOtp) {
      logger.info(`Reset OTP already sent to ${identifier}`, {
        identifier,
        expiresAt: existingOtp.expiresAt,
      });

      return NextResponse.json(
        {
          message: `کد یکبار مصرف قبلا ارسال شده است.`,
          expiresAt: existingOtp.expiresAt,
        },
        { status: 200 }
      );
    }

    // save otp to database
    const otpData = {
      otp,
      expiresAt: otpExpiresAt,
      type: "reset-password",
      [identifierType]: identifier,
    };

    // remove old OTPs for this identifier
    await Otp.deleteMany({
      $or: [{ phoneNumber: identifier }, { email: identifier }],
      type: "reset-password"
    });

    await Otp.create(otpData);

    // send otp
    if (identifierType === "email") {
      await sendEmailOtp(identifier, otp);
    } else {
      await sendOtpMeli(identifier, [otp]);
    }

    logger.info(`Reset OTP sent successfully to ${identifier}`, {
      identifier,
      expiresAt: otpExpiresAt,
    });

    return NextResponse.json(
      {
        message: `کد یکبار مصرف برای بازیابی رمز عبور به ${
          identifierType === "email" ? "ایمیل" : "شماره موبایل"
        } شما ارسال شد.`,
      },
      { status: 200 }
    );
  } catch (err) {
    return errorHandler(err);
  }
};

export { sendResetOtp as POST };
