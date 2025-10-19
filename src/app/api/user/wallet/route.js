import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createUnauthorizedError } from "@/lib/utils/errors";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// get user wallet balance
const getUserWallet = async (req) => {
  try {
    await connectToDb();

    // get session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw createUnauthorizedError("برای دسترسی به کیف پول باید وارد شوید");
    }

    // get user
    const user = await User.findById(session.user.id).select("balance");

    // check if user is found
    if (!user) {
      throw createUnauthorizedError("کاربر یافت نشد");
    }

    // return response
    return NextResponse.json({
      success: true,
      balance: user.balance || 0,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { getUserWallet as GET };


