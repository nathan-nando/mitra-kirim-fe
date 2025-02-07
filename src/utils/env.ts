export const urlBE = () => {
    if (process.env.NEXT_PUBLIC_BE_URL) {
        return process.env.NEXT_PUBLIC_BE_URL;
    }
    return 'http://localhost:9000/api/v1';
};

