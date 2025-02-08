"use server"

import {apiConfiguration, apiLocation} from "@/api/api";
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

export async function addLocationAPI(body) {
    try {
        const response = await httpRequest(apiLocation, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        })
        if (response?.status >= 400) {
            console.log(response)
            const errMessage = await response?.json()
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        return true
    } catch (err) {
        console.error("Caught error in action: ");
        throw err
    }
}

