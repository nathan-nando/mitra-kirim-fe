"use server"

const api = 'http://management-svc:9000/api/v1/location'

export async function GetAllAPI() {
    try {
        const response = await fetch(api,
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
