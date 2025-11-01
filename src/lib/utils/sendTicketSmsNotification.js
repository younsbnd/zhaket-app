import { logger } from "./logger";

// Helper function to translate ticket status to Persian
const getStatusText = (status) => {
  const statusMap = {
    OPEN: "باز",
    PENDING: "در انتظار پاسخ",
    ANSWERED: "پاسخ داده شد",
    CLOSED: "بسته شده",
  };
  return statusMap[status.toUpperCase()] || status;
};

/**
 * Sends a ticket notification SMS using MeliPayamak service.
 * @param {string} phoneNumber - The recipient's phone number.
 * @param {string} fullName - The user's full name.
 * @param {string} ticketNumber - The ticket number.
 * @param {string} status - The ticket's status.
 * @returns {Promise<{success: boolean, responseCode?: string, error?: string}>}
 */
const sendTicketSmsNotification = async (
  phoneNumber,
  fullName,
  ticketNumber,
  status
) => {
  // send ticket sms notification using MeliPayamak service
  const apiUrl =
    "https://api.payamak-panel.com/post/Send.asmx/SendByBaseNumber2";

  const paramsArray = [fullName, ticketNumber, getStatusText(status)];

  // create payload for the request
  const payload = new URLSearchParams();
  payload.append("username", process.env.MELIPAYAMAK_USERNAME);
  payload.append("password", process.env.MELIPAYAMAK_PASSWORD);
  payload.append("text", paramsArray.join(";"));
  payload.append("to", phoneNumber);
  payload.append("bodyId", process.env.MELIPAYAMAK_TICKET_BODY_ID);

  try {
    // send request to MeliPayamak service
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    // get result
    const resultText = await response.text();
    // check if the request is successful
    const isSuccess = /^\d+$/.test(resultText);

    // if the request is not successful, log the error
    if (!isSuccess) {
      logger.error(
        `Failed to send ticket SMS via MeliPayamak. Response: ${resultText}`
      );
    }

    // return the result
    return {
      success: isSuccess,
      responseCode: resultText,
    };
  } catch (error) {
    logger.error("Error sending ticket SMS notification:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default sendTicketSmsNotification;
