"use server"

import {apiLocation, getApi} from "@/api/api";

export async function GetAllAPI() {
    try {
        console.log(getApi(apiLocation))
        const response = await fetch(getApi(apiLocation),
            {
                method: 'GET',
            });
        const {data} = await response.json();
        return data
    } catch (error) {
        console.error(error);
        throw error
    }
}
