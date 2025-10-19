import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import Otp from "@/models/Otp";
import User from "@/models/User";
import { NextResponse } from "next/server";

const verifyResetOtp = async (req) => {
  try {
    const body = await req.json();
    const { identifier, otp } = body;

    // Simple validation
    if (!identifier || identifier.trim().length === 0) {
      throw createBadRequestError("شناسه الزامی است");
    }
    if (!otp || otp.length !== 4) {
      throw createBadRequestError("کد یکبار مصرف باید 4 رقم باشد");
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

    // find otp
    const otpRecord = await Otp.findOne({
      $or: [{ phoneNumber: identifier }, { email: identifier }],
      otp,
      type: "reset-password",
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      throw createBadRequestError("کد یکبار مصرف نامعتبر یا منقضی شده است");
    }

    // mark otp as verified
    otpRecord.isVerified = true;
    await otpRecord.save();

    return NextResponse.json(
      {
        message: "کد یکبار مصرف تایید شد",
        verified: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return errorHandler(err);
  }
};

export { verifyResetOtp as POST };
