"use client"

import "./page.module.css"
import React, {useEffect, useState} from "react";
import {GetAllAPI} from "@/app/admin/suggestion/action";
import {TableUI} from "@/components/ui/table/Table";
import { Modal} from "react-bootstrap";
import {Detail} from "@/components/ui/detail/Detail";
import {formatDate} from "@/utils/date";

type TableRow = {
    [key: string]: string | number;
};


export default function SuggestionAdm() {
    const [dataList, setDataList] = useState([])
    const [selectedData, setSelectedData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        GetAllAPI()
            .then((v => {
                setLoading(false)
                setDataList(v)
            }))
            .catch(()=>{
                setLoading(false)
            })
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleView = (row: TableRow) => {
        setSelectedData({
            name: row.name,
            email: row.email,
            message: row.message,
            reply: row.reply,
            createdDate: formatDate(String(row.createdDate))
        })
        handleShow()
    };

    const fields: string[] = ['name', 'email'];

    return <div className={" p-4 suggestion d-flex flex-column gap-3"}>
        <h5 className={"fw-bold"}>Saran</h5>

        <TableUI
            loading={loading}
            fields={fields}
            data={dataList}
            onView={handleView}
        />
        <Modal className={"modal-lg"} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold"}>Lihat Data</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"col-12"}>
                <Detail data={selectedData}/>
            </Modal.Body>
        </Modal>
    </div>
}
