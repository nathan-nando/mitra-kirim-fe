"use server"

import {httpRequest} from "@/utils/httpRequest";
import {apiUser} from "@/api/api";

export async function getUserAPI(){
    try {
        const response  = await httpRequest(apiUser + "/information", {
            method: "GET"
        })
        if (response?.status >= 400) {
            const errMessage = await response?.json()
            console.log(errMessage)
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        return response
    } catch (err){
        throw err
    }
}

export async function updateUserAPI(body){
    try {
        const response  = await httpRequest(apiUser + "/information", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        if (response?.status >= 400) {
            const errMessage = await response?.json()
            console.log(errMessage)
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        return true
    } catch (err){
        throw err
    }
}

export async function updateUserPictureAPI(formData){
    try {
        const response  = await httpRequest(apiUser + "/picture", {
            method: "PATCH",
            body: formData
        })
        if (response?.status >= 400) {
            const errMessage = await response?.json()
            console.log(errMessage)
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        return true
    } catch (err){
        throw err
    }
}
