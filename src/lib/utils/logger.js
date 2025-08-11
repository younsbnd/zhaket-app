//   log levels for the logger
const LOG_LEVELS = {
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

//   log the message to the console
const log = (level, message, details = {}) => {
  if (level === LOG_LEVELS.DEBUG && process.env.NODE_ENV !== "development") {
    return;
  }

  //   get the timestamp
  const timestamp = new Date().toISOString();

  //   format the message
  const formattedMessage = `${level} - [${timestamp}] - ${message}`;

  //   log the message to the console
  switch (level) {
    case LOG_LEVELS.DEBUG:
      console.debug(formattedMessage, details);
      break;
    case LOG_LEVELS.INFO:
      console.info(formattedMessage, details);
      break;
    case LOG_LEVELS.WARN:
      console.warn(formattedMessage, details);
      break;
    case LOG_LEVELS.ERROR:
      console.error(formattedMessage, details);
      break;
  }
};

//  logger is a singleton object that can be used to log messages to the console
export const logger = {
  debug: (message, details) => log(LOG_LEVELS.DEBUG, message, details),
  info: (message, details) => log(LOG_LEVELS.INFO, message, details),
  warn: (message, details) => log(LOG_LEVELS.WARN, message, details),
  error: (message, error) => log(LOG_LEVELS.ERROR, message, { error }),
};
