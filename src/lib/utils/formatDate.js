
  // Format date to Persian
  export const formatDate = (dateString) => {
    if (!dateString) return "تاریخ نامشخص";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "تاریخ نامعتبر";
      }

      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      return "تاریخ نامعتبر";
    }
  };
