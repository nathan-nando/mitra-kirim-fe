import {getApi} from "@/api/api";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {refreshAPI} from "@/app/(guest)/login/action";

export async function httpRequest(endpoint: string, params: RequestInit) {
    try {
        const cookieInstance = await cookies()
        const cookie = cookieInstance.get("X_APP_1")?.value

        if (!params.headers) {
            params.headers = new Headers();
        } else if (typeof params.headers === 'object' && !(params.headers instanceof Headers)) {
            params.headers = new Headers(params.headers);
        }

        if (cookie) {
            (params.headers as Headers).set("Authorization", `Bearer ${cookie}`);
        }

        const response = await fetch(getApi(endpoint), params);
        const jsonRes = await response.json()
        if (!response.ok) {
            if (response.status == 401)
                await refreshAPI()
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


