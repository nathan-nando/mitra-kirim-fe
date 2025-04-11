"use server"

import {httpRequest} from "@/utils/httpRequest";
import {apiConfiguration} from "@/api/api";

export async function updateHeroAPI(formData: FormData) {
    console.log(formData, "PAYLOAD")
    try {
        const response = await httpRequest(apiConfiguration + "/hero", {
            method: 'PATCH',
            body: formData,
        })
        if (response?.status >= 400) {
            const errMessage = await response?.json()
            throw new Error(errMessage.message || "Action: Failed Request")
        }
        return true
    } catch (err) {
        console.error("Caught error in action: ");
        throw err
    }
}
