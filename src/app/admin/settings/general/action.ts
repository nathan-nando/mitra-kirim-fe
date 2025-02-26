"use server"

import {apiConfiguration} from "@/api/api";
import {httpRequest} from "@/utils/httpRequest";


export async function GetByTypeAPI(types: string[]) {
    try {
        console.log("CALL")
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
        console.log(response, "DATA")
        return response
    } catch (error) {
        throw error
    }
}

export async function updateAppAPI(body) {
    try {
        const response = await httpRequest(apiConfiguration + "/app", {
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

export async function updateSocialAPI(body) {
    try {
        const response = await httpRequest(apiConfiguration + "/social", {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        })
        if (response?.status >= 400) {
            const errMessage = await response?.json()
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        return true
    } catch (err) {
        throw err
    }
}

export async function updateTokoAPI(body) {
    try {
        const response = await httpRequest(apiConfiguration + "/toko", {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
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
