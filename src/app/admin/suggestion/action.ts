"use server"


import {apiSuggestion} from "@/api/api";
import {httpRequest} from "@/utils/httpRequest";

export async function GetAllAPI() {
    try {
        const response = await httpRequest(apiSuggestion,
            {
                method: 'GET',
            });
        if (response.status >= 400) {
            const errMessage = await response?.json()
            throw new Error("Error Action: ", errMessage)
        }
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}
