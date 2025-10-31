import connectToDb from "@/lib/utils/db";
import { createBadRequestError } from "@/lib/utils/errors";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { errorHandler } from "@/lib/utils/errorHandler";
import { createUnauthorizedError, createNotFoundError } from "@/lib/utils/errors";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";
 



const getInvoices = async (req, res) => {
    try {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw createUnauthorizedError("برای دسترسی به این صفحه باید وارد شوید");
    }
    await connectToDb();    
        const orders = await Order.find({ user: session.user.id}).select('+createdAt ').populate('user', 'fullName phoneNumber email');
        
        if (!orders) {
            throw createNotFoundError("محصول خریداری شده یافت نشد");
        }

        return NextResponse.json({
            success: true,
            data: orders,
        }); 
    } catch (error) {
        return errorHandler(error);
    }
};

export { getInvoices as GET };      