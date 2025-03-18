"use server"

import {apiPublic, getApi} from "@/api/api";
import {httpRequest} from "@/utils/httpRequest";


export const addSuggestionAPI = async (formData: FormData) => {
    try {
        const name = formData.get("name")
        const email = formData.get("email")
        const message = formData.get("message")

        const body = {name: name, email: email, message: message}
        const jsonBody = JSON.stringify(body)
        console.log(jsonBody)
        await fetch(getApi(apiPublic + "/suggestion"), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: jsonBody
        })
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

export const getConfigurationAPI = async () => {
    try {
        const body = [
            "APPLICATION_CONFIG",
            "SOCIAL_MEDIA_CONFIG",
            "ONLINE_SHOP_CONFIG",
            "LAYOUT_CONFIG"
        ]
        const jsonBody = JSON.stringify(body)
        const data = await httpRequest(apiPublic + "/configuration", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: jsonBody,
            // next: {revalidate: 3600}
        })
        return data
    } catch (err) {
        console.log(err)
        throw err
    }
}
