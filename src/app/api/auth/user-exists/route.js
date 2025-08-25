import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { identifierSchema } from "@/lib/validations/userValidation";
import User from "@/models/User";
import { NextResponse } from "next/server";

// check if user exists
const userExists = async (req, res) => {
  try {
    const body = await req.json();

    const validationResult = identifierSchema.safeParse(body);
    if (!validationResult.success) {
      throw validationResult.error;
    }

    const identifier = validationResult.data.identifier;

    await connectToDb();

    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    return NextResponse.json({
      userExists: !!existingUser,
    });
  } catch (error) {
    return errorHandler(error);
  }
};

export { userExists as POST };
