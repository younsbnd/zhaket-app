import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createBadRequestError } from "@/lib/utils/errors";
import { registerSchema } from "@/lib/validations/userValidation";
import Otp from "@/models/Otp";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const userRegister = async (req, res) => {
  try {
    const body = await req.json();
    const { withOtp, otp } = body;

    // validate body
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      throw validationResult.error;
    }

    await connectToDb();

    // create query conditions for email and phoneNumber
    const { email, phoneNumber } = validationResult.data;
    const queryConditions = [];
    if (email) {
      queryConditions.push({ email });
    }
    if (phoneNumber) {
      queryConditions.push({ phoneNumber });
    }

    // check if user exists
    const user = await User.findOne({ $or: queryConditions });

    if (user) {
      throw createBadRequestError(
        "کاربری با این ایمیل یا شماره موبایل قبلا ثبت نام کرده است"
      );
    }

    // if withOtp is false, create user with password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    if (!withOtp) {
      await User.create({
        ...validationResult.data,
        password: hashedPassword,
      });

      return NextResponse.json(
        {
          message: "ثبت نام با موفقیت انجام شد",
        },
        { status: 201 }
      );
    } else if (withOtp) {
      const existingOtp = await Otp.findOne({
        $or: [{ phoneNumber }, { email }],
        expiresAt: { $gt: new Date() },
      });

      if (!existingOtp) {
        throw createBadRequestError("کد یکبار مصرف یافت نشد یا منقضی شده است");
      }

      // check if otp is correct
      if (existingOtp && existingOtp.otp === otp) {
        await User.create({
          ...validationResult.data,
          password: hashedPassword,
        });

        // delete otp
        await Otp.deleteOne({ _id: existingOtp._id });

        return NextResponse.json(
          {
            message: "ثبت نام با موفقیت انجام شد",
          },
          { status: 201 }
        );
      } else if (existingOtp && existingOtp.otp !== otp) {
        throw createBadRequestError("کد یکبار مصرف اشتباه است");
      }
    }
  } catch (error) {
    return errorHandler(error);
  }
};

export { userRegister as POST };
