export const camelCaseToReadable = (input: string): string => {
    // Insert a space before all capital letters and trim any leading/trailing spaces
    const withSpaces = input.replace(/([A-Z])/g, " $1").trim();

    // Capitalize the first letter of each word
    return withSpaces
        .split(" ") // Split into words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(" "); // Join with spaces
};
