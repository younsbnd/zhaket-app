import connectToDb from "@/lib/utils/db";
import { errorHandler } from "@/lib/utils/errorHandler";
import { logger } from "@/lib/utils/logger";
import { registerSchema } from "@/lib/validations/userValidation";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
  
/**
 * GET handler for retrieving all users
 * @route   GET /api/users
 * @desc    Get all users list
 * @access  Admin
 * @returns {NextResponse} JSON response with users data
 */
async function getAllUsers() {
  try {
    await connectToDb();

    // Retrieve all users with selected fields, excluding password
    const users = await User.find({})
      .select("fullName phoneNumber email role createdAt updatedAt")
      .lean();

    logger.info("Users retrieved successfully", { count: users.length });

    return NextResponse.json({
      success: true,
      message: "دریافت کاربران با موفقیت انجام شد",
      data: users,
      count: users.length,
    });
  } catch (error) {
    logger.error("Error retrieving users", { error: error.message });
    return errorHandler(error);
  }
}

/**
 * POST handler for creating a new user
 * @route   POST /api/users
 * @desc    Create a new user (requires either email or phone number, not both)
 * @access  Admin
 * @param {Request} request - HTTP request object
 * @returns {NextResponse} JSON response with created user data
 */
async function createUser(request) {
  try {
    await connectToDb();

    const body = await request.json();
    
    // Validate input data with Zod schema
    const validatedData = registerSchema.parse(body);

    // Check if at least one contact method (email or phone) is provided
    if (!validatedData.email && !validatedData.phoneNumber) {
      logger.warn("User creation failed - no contact method provided");
      
      return NextResponse.json({
        success: false,
        message: "حداقل یکی از فیلدهای ایمیل یا شماره تلفن باید وارد شود"
      }, { status: 400 });
    }

    // Build query to check for existing user based on provided contact methods
    const existingUserQuery = [];
    
    if (validatedData.email) {
      existingUserQuery.push({ email: validatedData.email });
    }
    
    if (validatedData.phoneNumber) {
      existingUserQuery.push({ phoneNumber: validatedData.phoneNumber });
    }

    // Check if user already exists with provided email or phone number
    const existingUser = await User.findOne({
      $or: existingUserQuery
    });

    if (existingUser) {
      // Determine which field caused the conflict
      let conflictField = "";
      if (existingUser.email === validatedData.email) {
        conflictField = "ایمیل";
      } else if (existingUser.phoneNumber === validatedData.phoneNumber) {
        conflictField = "شماره تلفن";
      }

      logger.warn("User creation failed - user already exists", { 
        email: validatedData.email, 
        phoneNumber: validatedData.phoneNumber,
        conflictField
      });
      
      return NextResponse.json({
        success: false,
        message: `کاربر با این ${conflictField} قبلاً ثبت نام کرده است`
      }, { status: 409 });
    }

    // Hash password if provided
    let hashedPassword;
    if (validatedData.password) {
      const saltRounds = 12;
      hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);
    }

    // Create new user object with only provided fields
    const userData = {
      fullName: validatedData.fullName,
      role: validatedData.role
    };

    // Add contact methods only if provided
    if (validatedData.email) {
      userData.email = validatedData.email;
    }
    
    if (validatedData.phoneNumber) {
      userData.phoneNumber = validatedData.phoneNumber;
    }
    
    if (hashedPassword) {
      userData.password = hashedPassword;
    }
 
    // Create and save new user
    const newUser = new User(userData);
    await newUser.save();

    // Prepare response data without password
    const userResponse = newUser.toObject();
    delete userResponse.password;

    logger.info("User created successfully", { 
      userId: newUser._id, 
      email: validatedData.email || "not provided",
      phoneNumber: validatedData.phoneNumber || "not provided"
    });

    return NextResponse.json({
      success: true,
      message: "کاربر با موفقیت ایجاد شد",
      data: userResponse
    }, { status: 201 });

  } catch (error) {
    // Handle Zod validation errors
    if (error.name === 'ZodError') {
      logger.warn("User creation failed - validation error", { 
        errors: error.errors 
      });
      
      return NextResponse.json({
        success: false,
        message: "داده‌های ورودی نامعتبر است",
        errors: error.errors
      }, { status: 400 });
    }

    logger.error("Error creating user", { error: error.message });
    return errorHandler(error);
  }
}

// Export handlers with HTTP method aliases
export { getAllUsers as GET };
export { createUser as POST };
