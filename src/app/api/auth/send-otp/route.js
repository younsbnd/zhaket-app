import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import Otp from "@/models/Otp";
import User from "@/models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendOtpMeli } from "@/lib/utils/sendOtpMeli";
import sendEmailOtp from "@/lib/utils/sendEmailOtp";
import { identifierSchema } from "@/lib/validations/userValidation";
import { logger } from "@/lib/utils/logger";

const sendOtp = async (req, res) => {
  try {
    const body = await req.json();

    // validate identifier
    const validationResult = identifierSchema.safeParse(body);
    if (!validationResult.success) {
      throw validationResult.error;
    }

    const identifier = validationResult.data.identifier;

    await connectToDb();

    // check if user exists
    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });
    const existingUser = !!user;

    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);

    // check if otp is already sent
    const existingOtp = await Otp.findOne({
      $or: [{ phoneNumber: identifier }, { email: identifier }],
      expiresAt: { $gt: new Date() },
    });

    const identifierType = identifier.includes("@") ? "email" : "phoneNumber";

    // if otp is not sent, delete all expired otps and send new otp
    if (!existingOtp) {
      await Otp.deleteMany({
        $or: [{ phoneNumber: identifier }, { email: identifier }],
        expiresAt: { $lt: new Date() },
      });

      await Otp.create({
        [identifierType]: identifier,
        otp,
        type: existingUser ? "login" : "register",
        expiresAt: otpExpiresAt,
      });

      // send otp to phone number
      if (identifierType === "phoneNumber") {
        await sendOtpMeli(identifier, [otp]);
      } else {
        // send otp to email
        const emailResult = await sendEmailOtp(identifier, otp);

        if (!emailResult.data) {
          await Otp.deleteMany({ email: identifier });
          throw createBadRequestError(
            "خطا در ارسال ایمیل لطفا دوباره تلاش کنید"
          );
        }
      }

      return NextResponse.json({
        success: true,
        message: "کد یکبار مصرف با موفقیت ارسال شد",
      });
    } else {
      // if otp is sent, check if it is expired
      return NextResponse.json({
        success: false,
        message: `شما به تازگی یک کد دریافت کرده‌اید. لطفاً  ${Math.ceil(
          (existingOtp.expiresAt - new Date()) / 60000
        )} دقیقه دیگر برای درخواست مجدد تلاش کنید.`,
        expiresAt: existingOtp.expiresAt,
      });
    }
  } catch (err) {
    return errorHandler(err);
  }
};

// get request for resend otp
const getOtp = async (req) => {
  try {
    const { searchParams } = req.nextUrl;
    const identifier = searchParams.get("identifier");

    logger.info("identifier :", identifier);

    const validationResult = identifierSchema.safeParse({ identifier });
    if (!validationResult.success) {
      throw validationResult.error;
    }

    await connectToDb();
    const otp = await Otp.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
      expiresAt: { $gt: new Date() },
    });

    return NextResponse.json({
      success: true,
      otp,
    });
  } catch (err) {
    return errorHandler(err);
  }
};

export { sendOtp as POST, getOtp as GET };
