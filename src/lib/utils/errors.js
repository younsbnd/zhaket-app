// create a custom error 
const createApiError = (statusCode, defaultMessage, customMessage) => {
  const error = new Error(customMessage || defaultMessage);
  error.statusCode = statusCode;
  return error;
};

// create a bad request error
export const createBadRequestError = (message) =>
  createApiError(400, "Bad Request", message);

// create a unauthorized error
export const createUnauthorizedError = (message) =>
  createApiError(401, "Unauthorized", message);

// create a not found error
export const createNotFoundError = (message) =>
  createApiError(404, "Not Found", message);

// create a internal server error
export const createInternalServerError = (message) =>
  createApiError(500, "Internal Server Error", message);
