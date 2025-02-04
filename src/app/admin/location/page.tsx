"use client"

import React, {useEffect, useState} from "react";
import "./location.css"
import {formatDate} from "@/utils/date";
import {GetAllAPI} from "@/app/admin/location/action";
import {TableUI} from "@/components/ui/table/Table";
import {Modal} from "react-bootstrap";
import {Detail} from "@/components/ui/detail/Detail";
import {modalHeader} from "@/utils/modal";
import {string} from "prop-types";

type SelectedData = {
    data?: any
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
            <form className={"d-flex flex-column gap-3 col-10 p-2 ps-5"}>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Nama Lokasi</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text bi bi-building-fill" id="basic-addon1"></span>
                        <input type="text"
                               className="form-control"
                               placeholder=""
                               aria-label="name"
                               aria-describedby="basic-addon1"/>
                    </div>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Deskripsi</label>
                    <textarea className={"form-control"} name="description" cols={20} rows={7}></textarea>
                </div>
                <div className={"d-flex flex-column gap-2"}>
                    <label htmlFor="">Link Google Maps</label>
                    <textarea className={"form-control"} name="description" cols={20} rows={7}></textarea>
                </div>

                <div className={"d-flex justify-content-end"}>
                    <button className={"btn btn-foreground"}>Submit</button>
                </div>
            </form>
        </>
    }
    const renderOnUpdate = () => {
        return <>
            <form>
                <input type="text" className={"form-control"}/>
            </form>
        </>
    }

    const fields: string[] = ['nama', 'deskripsi'];

    return <div className={"p-3 d-flex flex-column gap-3"}>
        <h5 className={"fw-bold"}>Location</h5>
        <TableUI
            loading={loading}
            fields={fields}
            data={dataList}
            onView={handleView}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
        <Modal className={"modal-xl text-black-custom"} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold"}>{modalHeader(modeModal)}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"col-12 d-flex flex-column gap-3"}>
                {modeModal === "v" ? renderOnView(selectedData.iframeLink!) : ""}
                {modeModal === "a" || modeModal === "u" ? renderForm() : ""}
            </Modal.Body>
        </Modal>

    </div>
}
