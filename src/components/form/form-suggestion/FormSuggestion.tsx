"use client"

import "./form-suggestion.css"
import Button from "@/components/ui/button/Button";
import {toast, Toaster} from "sonner";
import {addSuggestion} from "@/app/(guest)/action";

export function FormSuggestion() {
    const header = "Kritik dan Saran"

    return <div className={"form-suggestion d-flex flex-column gap-2 align-items-center text-black-custom "}>
        <Toaster richColors={true}/>
        <h4>{header}</h4>
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


            }}
            className={"d-flex flex-column gap-4 col-12 col-lg-6 p-3 p-lg-0"}>
            <div className={"d-flex flex-column flex-lg-row justify-content-between"}>
                <div className="form-group col-12 col-lg-5">
                    <label htmlFor="nameInput">Name</label>
                    <input type="text"
                           className="form-control"
                           name="name"
                           id="nameInput"
                           aria-describedby="emailHelp"
                           placeholder="Enter name"/>
                </div>
                <div className="form-group  col-12 col-lg-5">
                    <label htmlFor="emailInput">Email address</label>
                    <input type="email"
                           className="form-control"
                           name="email"
                           id="emailInput"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                </div>
            </div>
            <div className="">
                <label htmlFor="nameInput">Message</label>
                    <textarea
                        className="form-control"
                        id="textareaMessage"
                        rows={7}
                        name="message"
                    >
                    </textarea>
            </div>
            <Button/>
        </form>

    </div>
}
