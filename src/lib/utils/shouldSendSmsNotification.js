import { logger } from "./logger";

/**
 * Determines if an SMS notification should be sent to a user.
 * SMS should only be sent if the user has a phone number and no email address.
 * @param {object} user - The user object, expected to have `email` and `phoneNumber` properties.
 * @returns {{shouldSendSms: boolean, phoneNumber?: string}}
 */
const shouldSendSmsNotification = (user) => {
  if (!user) {
    logger.warn("shouldSendSmsNotification called with an undefined user object.");
    return { shouldSendSms: false };
  }

  const hasEmail = user.email && user.email.trim() !== "";
  const hasPhoneNumber = user.phoneNumber && user.phoneNumber.trim() !== "";

  if (hasPhoneNumber && !hasEmail) {
    return {
      shouldSendSms: true,
      phoneNumber: user.phoneNumber,
    };
  }

  return { shouldSendSms: false };
};

export default shouldSendSmsNotification;
