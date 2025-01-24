export const capitalizeWords = (sentence: string): string => {
    return sentence
        .split(' ') // Split the sentence into words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words back into a sentence
};
