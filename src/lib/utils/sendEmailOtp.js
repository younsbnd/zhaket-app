import OtpEmail from "@/components/emails/OtpEmail";
import { Resend } from "resend";
import { createBadRequestError } from "./errors";
import { logger } from "./logger";

const sendEmailOtp = async (email, otp) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const result = await resend.emails.send({
      from: "younes@nikgem.ir",
      to: email,
      subject: "کد تایید شما",
      react: <OtpEmail otpCode={otp} />,
    });
    return result;
  } catch (error) {
    logger.error(error);
    throw createBadRequestError("خطا در ارسال ایمیل");
  }
};

export default sendEmailOtp;
