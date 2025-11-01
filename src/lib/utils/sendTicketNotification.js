import TicketNotificationEmail from "@/components/emails/TicketNotificationEmail";
import { Resend } from "resend";
import { createBadRequestError } from "./errors";
import { logger } from "./logger";

// send ticket notification email to admin or user
const sendTicketNotification = async (email, ticket, userType = "user") => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const result = await resend.emails.send({
      from: "younes@nikgem.ir",
      to: email,
      subject: userType === "admin" 
        ? `تیکت جدید: ${ticket.title}` 
        : `وضعیت تیکت شما تغییر یافت: ${ticket.title}`,
      react: <TicketNotificationEmail ticket={ticket} userType={userType} />,
    });
    return result;
  } catch (error) {
    logger.error(error);
    throw createBadRequestError("خطا در ارسال ایمیل اطلاع‌رسانی");
  }
};

export default sendTicketNotification;
