"use server"


export const addSuggestion = async (formData: FormData) => {
    try {
        // const endpoint = `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/suggestion`
        // const endpoint = "localhost:9000/api/v1/suggestion"
        const name = formData.get("name")
        const email = formData.get("email")
        const message = formData.get("message")

        const body = {name: name, email: email, message: message}
        const jsonBody = JSON.stringify(body)
        console.log(jsonBody)
        await fetch("http://localhost:9000/api/v1/suggestion", {
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
