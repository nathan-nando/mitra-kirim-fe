"use client"

import "./login.css"
import {toast, Toaster} from "sonner";
import {addSuggestion} from "@/components/form/form-suggestion/action";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Button from "@/components/ui/button/Button";

export default function Page() {
    const router = useRouter()
    return <div className={"login-wrapper"}>
        <Toaster richColors={true}/>
        <form
            action={async (formData: FormData) => {
                let isValid: boolean = true
                formData.forEach((_, key) => {
                    console.log(key)
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
                    toast.success("Sukses Login")

                router.push("/admin")
            }}
            className={"login-form d-flex flex-column gap-4 shadow-sm"}>
            <h5 className={"text-black-custom"}>Selamat datang </h5>
            <small className={"text-muted"}>Silahkan login untuk melanjutkan sebagai admin</small>
            <div className="input-group mb-3">
                <span className="input-group-text bi bi-people" id="basic-addon1"></span>
                <input type="text"
                       name={"username"}
                       className="form-control"
                       placeholder="Username"
                       aria-label="Username"
                       aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3 mb-5">
                <span className="input-group-text bi bi-key" id="basic-addon1"></span>
                <input type="password"
                       name={"password"}
                       className="form-control"
                       placeholder="Password"
                       aria-label="Username"
                       aria-describedby="basic-addon1"/>
            </div>
            <Button name={"Login"}/>
        </form>
    </div>
}
