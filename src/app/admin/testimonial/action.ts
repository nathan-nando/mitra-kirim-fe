"use server"

import {httpRequest} from "@/utils/httpRequest";
import {apiTestimonial} from "@/api/api";

export async function getTestimonialAPI(limit: number, offset: number) {
    try {
        const params = {
            limit: limit.toString(),
            offset: offset.toString()
        }
        const query = new URLSearchParams(params)

        const response = await httpRequest(`${apiTestimonial}?  ${query}`, {
            method: "GET",
        })

        if (response?.status >= 400) {
            console.log("FAILED IN ACTION: ", response)
            const errMessage = await response?.json()
            throw new Error(errMessage.message || "Action: Failed Request")
        }

        return response
    } catch (err) {
        console.log(err)
        throw new Error(`Failed ${err}`)
    }
}

export async function addTestimonialAPI(formData: FormData) {
    try {
        console.log("formData", formData)
        const response = await httpRequest(apiTestimonial, {
            method: "POST",
            body: formData
        })

        if (response?.status >= 400) {
            return false
        }

        return true
    } catch (err) {
        throw err
    }
}

export async function changeStatusAPI(id: number, slide: number) {
    try {
        const response = await httpRequest(apiTestimonial + "/slide", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, slide})
        })

        if (response?.status >= 400) {
            return false
        }

        return true
    } catch (err) {
        throw err
    }
}

export async function deleteAPI(id: number) {
    try {
        const params = {
            id: id.toString()
        }
        const query = new URLSearchParams(params)

        const response = await httpRequest(`${apiTestimonial}?${query}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        })

        if (response?.status >= 400) {
            return false
        }

        return true
    } catch (err) {
        throw err
    }
}
