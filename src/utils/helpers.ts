export const withParagraphs = (str: string) => {
    if(!str)
        return []
    return str
        .trim()
        .split("\\n")
        .filter(line => line.trim() !== ""); // Remove empty lines
};
