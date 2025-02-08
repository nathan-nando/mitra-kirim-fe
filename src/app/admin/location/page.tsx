"use client"

import React, {useEffect, useState} from "react";
import "./location.css"
import {formatDate} from "@/utils/date";
import {addLocationAPI, GetAllAPI} from "@/app/admin/location/action";
import {TableUI} from "@/components/ui/table/Table";
import {Modal} from "react-bootstrap";
import {Detail} from "@/components/ui/detail/Detail";
import {modalHeader} from "@/utils/modal";
import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";
import Button from "@/components/ui/button/Button";
import {toast} from "sonner";
import {addTestimonialAPI} from "@/app/admin/testimonial/action";

type SelectedData = {
    data?: unknown
    iframeLink?: string
}

export default function LocationAdm() {
    const [dataList, setDataList] = useState([])
    const [selectedData, setSelectedData] = useState<SelectedData>({})
    const [loading, setLoading] = useState(false)
    //v view, a add, u update
    const [modeModal, setModal] = useState<"a" | "u" | "v">("v")

    useEffect(() => {
        setLoading(true)
        GetAllAPI()
            .then((v => {
                setLoading(false)
                setDataList(v)
            }))
            .catch(() => {
                setLoading(false)
            })
    }, [])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleView = (row) => {
        setModal("v")
        setSelectedData({
            data: {
                name: String(row.nama),
                deskripsi: String(row.deskripsi),
                email: String(row.email),
                whatsapp: String(row.whatsapp),
                createdDate: formatDate(String(row.createdDate))
            },
            iframeLink: row.iframeLink,
        },)
        handleShow()
    };
    const handleAdd = () => {
        setModal("a")
        handleShow()
    }
    const handleUpdate = () => {
        setModal("u")
        handleShow()

    }
    const handleDelete = () => {

    }

    const renderOnView = (src: string) => {
        return <>
            <Detail data={selectedData.data}/>
            <iframe
                className={"w-100 map-iframe"}
                src={decodeURIComponent(src)}
                height={500}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </>
    }

    const renderForm = () => {
        return <>
            <form action={async (formData: FormData) => {
                let isValid: boolean = true
                let dataForm = {}

                formData.forEach((_, key) => {
                    if (!formData.get(key)) {
                        isValid = false
                    }
                    dataForm[key] = formData[key]
                })


                if (!isValid) {
                    toast.error("Isi semua form")
                    return
                }
                toast.loading("Loading....")
                const ok = await addLocationAPI(dataForm)
                toast.dismiss()
                if (!ok) {
                    toast.error("Gagal menambah lokasi bisnis")
                    return
                }
                toast.success("Berhasil menambah lokasi bisnis")
                handleClose()
                // getAllAPI()

            }} id={"formLocation"} className={"d-flex flex-column gap-3 col-10 p-2 ps-5"}>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Nama Lokasi</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text bi bi-building" id="basic-addon1"></span>
                        <input type="text"
                               name={"nama"}
                               className="form-control"
                               placeholder=""
                               aria-label="name"
                               aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Email</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text bi bi-envelope" id="basic-addon1"></span>
                        <input type="text"
                               name={"email"}
                               className="form-control"
                               placeholder=""
                               aria-label="name"
                               aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">No Whatsapp</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text bi bi-whatsapp" id="basic-addon1"></span>
                        <input type="text"
                               name={"whatsapp"}
                               className="form-control"
                               placeholder=""
                               aria-label="name"
                               aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Alamat</label>
                    <textarea className={"form-control"} name="alamat" rows={3}></textarea>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Deskripsi</label>
                    <textarea className={"form-control"} name="deskripsi" rows={3}></textarea>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Link Google Maps</label>
                    <textarea className={"form-control"} name="iframeLink" rows={6}></textarea>
                </div>

                <div className={"d-flex justify-content-end mt-4"}>
                    <Button type={"submit"} name={"Submit"}/>
                </div>
            </form>
        </>
    }


    const fields: string[] = ['nama', 'email', 'whatsapp', 'alamat', 'deskripsi'];

    return <>
        <Breadcrumb items={["Location"]}/>
        <TableUI
            loading={loading}
            fields={fields}
            data={dataList}
            onView={handleView}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
        <Modal className={"modal-lg text-black-custom"} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold"}>{modalHeader(modeModal)}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"col-12 d-flex flex-column gap-3"}>
                {modeModal === "v" ? renderOnView(selectedData.iframeLink!) : ""}
                {modeModal === "a" || modeModal === "u" ? renderForm() : ""}
            </Modal.Body>
        </Modal>

    </>
}
