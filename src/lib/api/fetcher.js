// fetcher is a function that fetches data from an API

export const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    const errorInfo = await res.json().catch(() => ({}));
    const error = new Error(errorInfo.message || "خطا در دریافت داده");
    error.info = errorInfo;
    error.status = res.status;
    throw error;
  }
  return res.json();
};
