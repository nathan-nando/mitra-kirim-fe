"use server"

import {apiLocation} from "@/api/api";
import {httpRequest} from "@/utils/httpRequest";

export async function GetAllAPI() {
    try {
        const response = await httpRequest(apiLocation, {
            method: "GET",
        })
        if (response?.status >= 400) {
            const errMessage = await response?.json()
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}
