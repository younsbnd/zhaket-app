import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import Otp from "@/models/Otp";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const resetPassword = async (req) => {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    // Simple validation
    if (!identifier || identifier.trim().length === 0) {
      throw createBadRequestError("شناسه الزامی است");
    }
    if (!password || password.length < 8) {
      throw createBadRequestError("رمز عبور باید حداقل 8 کاراکتر باشد");
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

    // check if there's a verified OTP for this user
    const verifiedOtp = await Otp.findOne({
      $or: [{ phoneNumber: identifier }, { email: identifier }],
      type: "reset-password",
      isVerified: true,
      expiresAt: { $gt: new Date() },
    });

    if (!verifiedOtp) {
      throw createBadRequestError(
        "درخواست بازیابی رمز عبور معتبر یافت نشد. لطفا مجددا درخواست بازیابی کنید"
      );
    }

    // hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update user password
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    // remove all reset password OTPs for this user
    await Otp.deleteMany({
      $or: [{ phoneNumber: identifier }, { email: identifier }],
      type: "reset-password",
    });

    return NextResponse.json(
      {
        message: "رمز عبور با موفقیت تغییر یافت",
      },
      { status: 200 }
    );
  } catch (err) {
    return errorHandler(err);
  }
};

export { resetPassword as POST };
