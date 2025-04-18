"use server"

import {apiConfiguration} from "@/api/api";
import {httpRequest} from "@/utils/httpRequest";


export async function GetByTypeAPI(types: string[]) {
    try {
        const response = await httpRequest(apiConfiguration + "/type", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(types)
        })
        if (response?.status >= 400) {
            console.log(response)
            const errMessage = await response?.json()
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        return response
    } catch (error) {
        throw error
    }
}

export async function updateConfigurationAPI(body) {
    try {
        const response = await httpRequest(apiConfiguration, {
            method: 'PATCH',
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

export async function updateAppLogoAPI(formData: FormData) {
    try {
        const response = await httpRequest(apiConfiguration + "/appLogo", {
            method: 'PATCH',
            body: formData,
        })
        if (response?.status >= 400) {
            const errMessage = await response?.json()
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        return true
    } catch (err) {
        console.error("Caught error in action: ");
        throw err
    }
}
