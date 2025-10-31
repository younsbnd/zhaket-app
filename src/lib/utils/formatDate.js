
  // Format date to Persian
  export const formatDate = (dateString, format = "YYYY/MM/DD HH:mm") => {
    if (!dateString) return "تاریخ نامشخص";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "تاریخ نامعتبر";
      }

      return new Intl.DateTimeFormat("fa-IR", {
        year: format.includes("YYYY") ? "numeric" : undefined,
        month: format.includes("MM") ? "long" : undefined,
        day: format.includes("DD") ? "numeric" : undefined,
        hour: format.includes("HH") ? "2-digit" : undefined,
        minute: format.includes("mm") ? "2-digit" : undefined,
      }).format(date);
    } catch (error) {
      return "تاریخ نامعتبر";
    }
  };
