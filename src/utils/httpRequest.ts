"use server"

import {getApi} from "@/api/api";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {logout} from "@/app/(guest)/login/action";

export async function httpRequest(endpoint: string, params: RequestInit) {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("X_APP_1")?.value

        if (accessToken && await isTokenExpired(accessToken)) {
            await logout()
        }

        if (!params.headers) {
            params.headers = new Headers();
        } else if (typeof params.headers === 'object' && !(params.headers instanceof Headers)) {
            params.headers = new Headers(params.headers);
        }

        const currenAccessToken = cookieStore.get("X_APP_1")?.value
            params.headers.set("Authorization", `Bearer ${accessToken}`);
        if (currenAccessToken) {
            console.log("HTTP REQ WITH BEARER")
        }

        const response = await fetch(getApi(endpoint), params);
        const jsonRes = await response.json()
        if (!response.ok) {
            console.log(response, "NOT OK IN HTTP REQUEST")
            return new NextResponse(JSON.stringify({message: jsonRes.message || "Request is failed"}), {
                status: response.status || 500,
                headers: {'Content-Type': 'application/json'},
            })
        }
        return jsonRes.data
    } catch (error) {
        return new NextResponse(JSON.stringify(error))
    }
}

export const isTokenExpired = async(token: string) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
    return payload.exp * 1000 < Date.now(); // Check expiration
};



