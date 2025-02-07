"use client"

import "./login.css"
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import Button from "@/components/ui/button/Button";
import {loginAPI} from "@/app/(guest)/login/action";
import Link from "next/link";

export default function Page() {
    const router = useRouter()
    return <div className={"login-wrapper"}>
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
                toast.loading("Loading...")
                loginAPI(formData)
                    .then(() => {
                        toast.dismiss()
                        toast.success("Sukses Login")
                        router.push("/admin")
                    })
                    .catch(() => {
                        toast.dismiss()
                        toast.error("Username / password salah")
                    })
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
            <div className="col-12 text-center">
                <Button name={"Login"} type={"submit"} className={"btn-foreground col-8"}/>
            </div>
            <Link href={"/"} className={"text-center"}><small >Kembali</small></Link>
        </form>
    </div>
}
