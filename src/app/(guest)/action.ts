"use server"

import {apiSuggestion, getApi} from "@/api/api";


export const addSuggestion = async (formData: FormData) => {
    try {
        const name = formData.get("name")
        const email = formData.get("email")
        const message = formData.get("message")

        const body = {name: name, email: email, message: message}
        const jsonBody = JSON.stringify(body)
        console.log(jsonBody)
        await fetch(getApi(apiSuggestion), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: jsonBody
        })
        return null
    } catch (err) {
        console.log(err)
        throw err
    }
}
