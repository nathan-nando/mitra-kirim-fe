"use server"


import {apiSuggestion, getApi} from "@/api/api";

export async function GetAllAPI() {
    try {
        const response = await fetch(getApi(apiSuggestion),
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
