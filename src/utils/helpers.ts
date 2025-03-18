export const withParagraphs = (str: string) => {
    if(!str)
        return ""
    console.log(str, "STR")
    return str
        .trim()
        .split("\\n")
        .filter(line => line.trim() !== ""); // Remove empty lines
};
