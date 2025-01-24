"use server"

export async function GetAllAPI() {
    try {
        const response = await fetch('http://localhost:9000/api/v1/suggestion',
            {
                method: 'GET',
            });
        const {data} =  await response.json();
        return data
    } catch (error) {
        console.error(error);
        throw error
    }
}
