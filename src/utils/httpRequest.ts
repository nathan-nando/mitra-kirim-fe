import {getApi} from "@/api/api";
import {NextResponse} from "next/server";

export async function httpRequest(endpoint: string, params: RequestInit) {
    try {

        const response = await fetch(getApi(endpoint), params);
        const jsonRes = await response.json()
        console.log("JSON res: ", jsonRes)
        if (!response.ok) {
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

