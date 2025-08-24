import { logger } from "./logger";

export async function sendOtpMeli(phoneNumber, paramsArray) {
    const apiUrl =
      "https://api.payamak-panel.com/post/Send.asmx/SendByBaseNumber2";
  
    const payload = new URLSearchParams();
    payload.append("username", process.env.MELIPAYAMAK_USERNAME); // username
    payload.append("password", process.env.MELIPAYAMAK_PASSWORD); // password
    payload.append("text", paramsArray.join(";")); // values separated by ;
    payload.append("to", phoneNumber); // receiver phone number
    payload.append("bodyId", process.env.MELIPAYAMAK_BODY_ID); // body id
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });
  
      const resultText = await response.text();
  
      // if only number is returned, it means success
      const isSuccess = /^\d+$/.test(resultText);
  
      return {
        success: isSuccess,
        responseCode: resultText,
      };
    } catch (error) {
      logger.error("خطا در ارسال پیامک:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
  