"use client"

import "./form-suggestion.css"
import {addSuggestion} from "@/components/form/form-suggestion/action";
import Button from "@/components/ui/button/Button";
import {toast, Toaster} from "sonner";

export function FormSuggestion() {
    const header = "Kritik dan Saran"

    return <div className={"form-suggestion d-flex flex-column gap-2 align-items-center text-black-custom "}>
        <Toaster richColors={true}/>
        <h3>{header}</h3>
        <form
            action={async (formData: FormData) => {
                let isValid: boolean = true
                formData.forEach((_, key) => {
                    if (!formData.get(key)) {
                        isValid = false
                    }
                })
                if (!isValid) {
                    toast.error("Isi semua form")
                    return
                }

                const err = await addSuggestion(formData)
                if (!err)
                    toast.success("Berhasil mengirim kritik dan saran")


            }} className={"d-flex flex-column gap-4 col-5"}>
            <div className={"d-flex flex-row justify-content-between"}>
                <div className="form-group col-5">
                    <label htmlFor="nameInput">Name</label>
                    <input type="text"
                           className="form-control"
                           name="name"
                           id="nameInput"
                           aria-describedby="emailHelp"
                           placeholder="Enter name"/>
                </div>
                <div className="form-group col-5">
                    <label htmlFor="emailInput">Email address</label>
                    <input type="email"
                           className="form-control"
                           name="email"
                           id="emailInput"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="nameInput">Message</label>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        id="textareaMessage"
                        rows={3}
                        name="message"
                    >
                    </textarea>
                </div>
            </div>
            <Button/>
        </form>

    </div>
}
