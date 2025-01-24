export const formatDate = (dateString: string): string => {
    // Return empty string if the input is empty
    if (!dateString || dateString.trim() === "") {
        return "";
    }

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return ""; // Return empty string for invalid dates
    }

    // Format the date using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};
