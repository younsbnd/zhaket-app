import react, { useState } from "react";
import { useSWRConfig } from "swr";

export const useCrud = (endpoint) => {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   a generic function to fetch data
  const makeRequest = async (path = "", method, body = null) => {
    setIsLoading(true);
    setError(null);

    // Check if the endpoint is a full URL or a local path
    const isFullUrl = endpoint.startsWith("http");
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // create the full url
    const url = isFullUrl
      ? `${endpoint}${path}`
      : `${apiBaseUrl}${endpoint}${path}`;

    // create the options
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      // add the body to the options
      if (body) {
        options.body = JSON.stringify(body);
      }

      // make the request
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        // throw new Error(data.message || "خطا در دریافت داده");
        throw data;
      }

      //   mutate the data
      mutate(isFullUrl ? endpoint : `${apiBaseUrl}${endpoint}`);

      return {
        data,
        status: response.status,
        ok: response.ok,
      };
    } catch (error) {
      if (!error.errors) {
        const errorMessage =
        error?.error?.message ||
        error?.message ||
          "یک خطای پیش‌بینی نشده رخ داد.";
        setError(errorMessage);
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  //   create a record
  const createRecord = async (newData) => {
    return await makeRequest("", "POST", newData);
  };

  //   update a record
  const updateRecord = async (id, updatedData) => {
    return await makeRequest(`/${id}`, "PUT", updatedData);
  };

  //   delete a record
  const deleteRecord = async (id) => {
    return await makeRequest(`/${id}`, "DELETE");
  };

  return {
    createRecord,
    updateRecord,
    deleteRecord,
    isLoading,
    error,
  };
};
