/**
 * @param {Object} errorData - error data
 */

export const logErrorToServer = async (errorData) => {
  // only send to server in production
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  try {
    await fetch("/api/errors/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorData),
    });
  } catch (error) {}
};
