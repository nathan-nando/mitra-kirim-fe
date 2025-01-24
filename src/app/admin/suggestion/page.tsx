"use client"

import "./page.module.css"
import React, {useEffect, useState} from "react";
import {GetAllAPI} from "@/app/admin/suggestion/action";
import {TableUI} from "@/components/ui/table/Table";
import {Modal} from "react-bootstrap";
import {Detail} from "@/components/ui/detail/Detail";
import {formatDate} from "@/utils/date";
import {modalHeader} from "@/utils/modal";

type TableRow = {
    [key: string]: string | number;
};

type DetailData = {
    name: string
    email: string
    createdDate: Date | string
}

type SelectedData = {
    data?: DetailData
    message?: string
    reply?: string
    hasReply?: number
}

export default function SuggestionAdm() {
    const [dataList, setDataList] = useState([])
    const [selectedData, setSelectedData] = useState<SelectedData>({})
    const [loading, setLoading] = useState(false)
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
    const handleView = (row: TableRow) => {
        setSelectedData({
            data: {
                name: String(row.name),
                email: String(row.email),
                // message: row.message,
                createdDate: formatDate(String(row.createdDate))
            },
            message: String(row.message),
            reply: String(row.reply),
            hasReply: Number(row.hasReply),

        },)
        handleShow()
    };

    const fields: string[] = ['name', 'email'];

    return <div className={" p-3 suggestion d-flex flex-column gap-3"}>
        <h5 className={"fw-bold"}>Saran</h5>
        <TableUI
            loading={loading}
            fields={fields}
            data={dataList}
            onView={handleView}
        />
        <Modal className={"modal-lg text-black-custom"} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold"}>{modalHeader("v")}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"col-12 d-flex flex-column gap-3"}>
                <Detail data={selectedData.data}/>
                <div>
                    <p className={"fw-bold ms-3"}>Message</p>
                    <textarea className={"form-control w-75 ms-4"} disabled={true}>{selectedData.message}</textarea>
                </div>

                <div className={"mb-5"}>
                    <p className={"fw-bold ms-3"}>Reply</p>
                    <textarea rows={5}
                              className={"form-control w-75 ms-4"}
                              disabled={selectedData.hasReply == 1}>{selectedData.reply}</textarea>
                </div>
            </Modal.Body>
        </Modal>
    </div>
}
