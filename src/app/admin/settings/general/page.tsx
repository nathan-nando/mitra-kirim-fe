"use client"

import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";

export default function GeneralAdm() {
    return <>
        <Breadcrumb items={["Settings", "General"]}/>
        <div className={"col"}>
            <small className={"fw-bold"}>Aplikasi</small>
            <form id={"aplikasi"} className={"text-black-custom mx-auto col-12  mt-3"}>
                <div className={"row gap-4"}>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label>Nama</label>
                        <input type="text" className={"form-control"}/>
                    </div>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label>Logo</label>
                        <input type="file" className={"form-control"}/>
                    </div>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label>Deskripsi Singkat</label>
                        <textarea className={"form-control"}></textarea>
                    </div>

                </div>
            </form>
        </div>
        <div className={"col"}>
            <small className={"fw-bold"}>Social Media</small>
            <form id={"socialMedia"} className={"text-black-custom mx-auto col-12  mt-3"}>
                <div className={"row gap-4"}>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label><span className={"bi bi-whatsapp"}></span> Whatsapp utama</label>
                        <input type="text" className={"form-control"}/>
                    </div>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label><span className={"bi bi-instagram"}></span> Instagram</label>
                        <input type="text" className={"form-control"}/>
                    </div>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label><span className={"bi bi-tiktok"}></span> Tiktok</label>
                        <input type="text" className={"form-control"}/>
                    </div>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label><span className={"bi bi-facebook "}></span> Facebook</label>
                        <input type="text" className={"form-control"}/>
                    </div>

                </div>
            </form>
        </div>

        <div className={"col"}>
            <small className={"fw-bold"}>Toko Online</small>
            <form id={"tokoOnline"} className={"text-black-custom mx-auto col-12  mt-3"}>
                <div className={"row gap-4"}>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label>Tokopedia</label>
                        <input type="text" className={"form-control"}/>
                    </div>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label>Shopee</label>
                        <input type="text" className={"form-control"}/>
                    </div>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label>Blibli</label>
                        <input type="text" className={"form-control"}/>
                    </div>
                    <div className={"col-5 d-flex flex-column gap-2"}>
                        <label>Lazada</label>
                        <input type="text" className={"form-control"}/>
                    </div>

                </div>
            </form>
        </div>

    </>
}
