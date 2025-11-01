import User from "@/models/User";
import { logger } from "./logger";
import connectToDb from "./db";

// get admin emails for sending notifications
const getAdminEmails = async () => {
  try {
    await connectToDb();
    const admins = await User.find({ role: "admin" }).select("email fullName");
    const adminEmails = admins.map(admin => admin.email).filter(email => email);
    
    logger.info(`Found ${adminEmails.length} admin emails for notifications`);
    return adminEmails;
  } catch (error) {
    logger.error("Error fetching admin emails:", error);
    return [];
  }
};

export default getAdminEmails;
