import { logger } from "../utils/logger";

// function to fetch data from the server
export async function fetchServerData(path, option = {}) {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

  const url = `${apiBaseUrl}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: option.next,
      cache: option.cache || "no-store",
    });

    if (!response.ok) {
      throw new Error("خطا در دریافت داده");
    }

    return response.json();
  } catch (error) {
    logger.error(error);
    throw new Error("خطا در دریافت داده");
  }
}
