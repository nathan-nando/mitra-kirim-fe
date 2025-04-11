"use server"

import {apiAuth, getApi} from "@/api/api";
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

        const {token} = response

        if (!token) {
            throw new Error("Action: Token is empty")
        }
        const cookie = await cookies()
        cookie.set('X_APP_1', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: "/",
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const refreshAPI = async () => {
    // const cookieStore =await  cookies();
    // const refreshToken = cookieStore.get("X_APP_2")?.value;
    //
    // if (!refreshToken) {
    //     throw new Error("No refresh token available");
    // }
    //
    // try {
    //     const response = await fetch(getApi(apiAuth + "/refresh"), {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ refreshToken })
    //     });
    //
    //     if (!response.ok) {
    //         throw new Error("Refresh failed");
    //     }
    //
    //     const data = await response.json();
    //     const { accessToken } = data;
    //
    //     if (!accessToken) {
    //         throw new Error("No access token in refresh response");
    //     }
    //
    //     cookieStore.set('X_APP_1', accessToken, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === 'production',
    //         sameSite: 'lax',
    //         path: '/',
    //     });
    //
    //     return { success: true };
    // } catch (error) {
    //     console.error("Refresh error:", error);
    //     await logout();
    //     throw error;
    // }
}

export async function logout() {
    const cookie = await cookies()
    cookie.delete("X_APP_1")
    // cookie.delete("X_APP_2")
    redirect('/login')
}
