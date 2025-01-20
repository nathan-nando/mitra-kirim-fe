"use server"

export async function GetAllAPI() {
    try {
        const response = await fetch('http://localhost:9000/api/v1/suggestion');
        return response.json();
    } catch (error) {
        console.error(error);
        throw error
    }
}
