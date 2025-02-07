"use server"

import {apiAuth} from "@/api/api";
import {httpRequest} from "@/utils/httpRequest";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const loginAPI = async (formData: FormData) => {
    try {
        const response = await httpRequest(apiAuth + "/login", {
            method: "POST",
            body: formData
        })
        if (response?.status >= 400) {
            console.log(response)
            const errMessage = await response?.json()
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        console.log(response, "IN ACTION")
        const {token, refreshToken} = response

        console.log(token)

        if (!token || !refreshToken) {
            throw new Error("Action: Token is empty")
        }
        const cookie = await cookies()
        cookie.set('X_APP_1', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 // 15 minutes
        })


        cookie.set('X_APP_2', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 // 7 days
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}


export const refreshAPI = async () => {
    const cookie = await cookies()
    const refreshToken = cookie.get("X_APP_2")?.value
    const payload = {refreshToken}

    try {
        const response = await httpRequest(apiAuth + "/refresh", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })
        if (response?.status >= 400) {
            await logout()
            const errMessage = await response?.json()
            throw new Error(errMessage.message || "Action: Failed Request")
        }

        const {token} = response

        if (!token) {
            await logout()
            throw new Error("Action: Token is empty")
        }
        const cookie = await cookies()
        cookie.set('X_APP_1', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 // 15 minutes
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function logout() {
    const cookie = await cookies()
    cookie.delete("X_APP_1")
    cookie.delete("X_APP_2")
    redirect('/login')
}
