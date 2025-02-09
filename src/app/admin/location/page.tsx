"use client"

import React, {useEffect, useRef, useState} from "react";
import "./location.css"
import {addLocationAPI, deleteLocationAPI, GetAllAPI, updateLocationAPI} from "@/app/admin/location/action";
import {TableUI} from "@/components/ui/table/Table";
import {Modal} from "react-bootstrap";
import {Detail} from "@/components/ui/detail/Detail";
import {modalHeader} from "@/utils/modal";
import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";
import Button from "@/components/ui/button/Button";
import {toast} from "sonner";
import ButtonIcon from "@/components/ui/button/ButtonIcon";

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
    const [fullscreen, setFullscreen] = useState<true | string | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down'>(true)


    const [formState, setFormState] = useState({
        id: "",
        nama: "",
        email: "",
        whatsapp: "",
        alamat: "",
        deskripsi: "",
        iframeLink: "",
    });

    const toggleFullscreen = () => {
        if (fullscreen === true)
            setFullscreen("lg-down")
        else
            setFullscreen(true)
    }

    useEffect(() => {
        getAPI()
    }, [])

    const getAPI = () => {
        setLoading(true)
        GetAllAPI()
            .then((v => {
                setLoading(false)
                setDataList(v)
            }))
            .catch(() => {
                setLoading(false)
            })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleView = (row) => {
        setModal("v")
        console.log(row)
        setSelectedData({
            data: {
                name: String(row.nama),
                email: String(row.email),
                whatsapp: String(row.whatsapp),
                alamat: String(row.alamat),
                deskripsi: String(row.deskripsi),
                createdDate: row.createdDate,
                createdBy: String(row.createdBy),
                updatedDate: row.updatedDate,
                updatedBy: String(row.updatedBy),
            },
            iframeLink: row.iframeLink,
        },)
        handleShow()
    };
    const handleAdd = () => {
        setFullscreen("lg-down")
        setModal("a")
        handleShow()
    }
    const handleUpdate = (data) => {
        setFormState({
            id: data.id,
            nama: data.nama || "",
            email: data.email || "",
            whatsapp: data.whatsapp || "",
            alamat: data.alamat || "",
            deskripsi: data.deskripsi || "",
            iframeLink: data.iframeLink || "",
        });
        setModal("u")
        handleShow()
    }
    const handleDelete = (data) => {
        setLoading(true)
        toast.loading("Loading...")
        deleteLocationAPI(data.id)
            .then((v => {
                toast.dismiss()
                toast.success("Berhasil menghapus lokasi")
                getAPI()
            }))
            .catch(() => {
                toast.dismiss()
                toast.error("Gagal menghapus lokasi")
                setLoading(false)
            })
    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

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
                let dataForm: any = {}

                formData.forEach((value, key) => {
                    if (!formData.get(key)) {
                        isValid = false
                    }
                    dataForm[key] = value
                })

                if (!isValid) {
                    toast.error("Isi semua form")
                    return
                }

                let ok: boolean | void
                toast.loading("Loading....")
                if (modeModal === "a") {
                    ok = await addLocationAPI(dataForm).catch((err) => {
                        console.log(err)
                    })
                } else {
                    dataForm.id = formState.id
                    ok = await updateLocationAPI(dataForm).catch((err) => {
                        console.log(err)
                    })
                }
                toast.dismiss()
                if (!ok) {
                    toast.error("Gagal menyimpan lokasi bisnis")
                    return
                }
                toast.success("Berhasil menyimpan lokasi bisnis")
                getAPI()
                handleClose()

            }} id={"formLocation"} className={"d-flex flex-column gap-3 col-10 p-2 ps-5"}>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Nama Lokasi</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text bi bi-building" id="basic-addon1"></span>
                        <input type="text"
                               name={"nama"} onChange={handleChange} value={formState.nama}
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
                               name={"email"} onChange={handleChange} value={formState.email}
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
                               name={"whatsapp"} onChange={handleChange} value={formState.whatsapp}
                               className="form-control"
                               placeholder=""
                               aria-label="name"
                               aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Alamat</label>
                    <textarea
                        className={"form-control"}
                        name="alamat"
                        onChange={handleChange}
                        value={formState.alamat}
                        rows={3}></textarea>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Deskripsi</label>
                    <textarea
                        className={"form-control"}
                        name="deskripsi"
                        onChange={handleChange}
                        value={formState.deskripsi}
                        rows={3}></textarea>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Link Google Maps</label>
                    <textarea
                        className={"form-control"}
                        name="iframeLink"
                        onChange={handleChange}
                        value={formState.iframeLink}
                        rows={6}></textarea>
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
        <Modal className={"modal-lg text-black-custom"} fullscreen={fullscreen} show={show} onHide={handleClose}>
            <Modal.Header>
                <div className={"pe-3 col-12 d-flex flex-row justify-content-between"}>
                    <Modal.Title className={"fw-bold"}>{modalHeader(modeModal)}</Modal.Title>
                    <div className={"d-flex flex-row gap-3"}>
                        <ButtonIcon icon={"bi-fullscreen text-black-custom"} severity={" p-0"} cb={() => {
                            toggleFullscreen()
                        }}/>
                        <ButtonIcon icon={"bi-x fs-4 text-black-custom"} severity={" p-0"} cb={() => {
                            handleClose()
                        }}/>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className={"col-12 d-flex flex-column gap-3"}>
                {modeModal === "v" ? renderOnView(selectedData.iframeLink!) : ""}
                {modeModal === "a" || modeModal === "u" ? renderForm() : ""}
            </Modal.Body>
        </Modal>

    </>
}
