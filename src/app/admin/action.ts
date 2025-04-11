"use server"

import {httpRequest} from "@/utils/httpRequest";
import {apiDashboard} from "@/api/api";

export async function GetDashboardAPI() {
    try {
        const response = await httpRequest(apiDashboard, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
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
