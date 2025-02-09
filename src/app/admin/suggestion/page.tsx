"use client"

import "./page.module.css"
import React, {useEffect, useState} from "react";
import {GetAllAPI} from "@/app/admin/suggestion/action";
import {TableUI} from "@/components/ui/table/Table";
import {Modal} from "react-bootstrap";
import {Detail} from "@/components/ui/detail/Detail";
import {formatDate} from "@/utils/date";
import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";
import Button from "@/components/ui/button/Button";
import ButtonIcon from "@/components/ui/button/ButtonIcon";

type DetailData = {
    name: string
    email: string
    createdDate: Date | string
}

type SelectedData = {
    data?: DetailData
    message?: string
    reply?: string
    hasReplied?: number
}

export default function SuggestionAdm() {
    const [dataList, setDataList] = useState([])
    const [selectedData, setSelectedData] = useState<SelectedData>({})
    const [loading, setLoading] = useState(false)
    const [fullscreen, setFullscreen] = useState<true | string | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down'>(true)

    const toggleFullscreen = () => {
        if (fullscreen === true)
            setFullscreen("lg-down")
        else
            setFullscreen(true)
    }

    useEffect(() => {
        setLoading(true)
        GetAllAPI()
            .then((v => {
                v.map(v=>{
                    v.status = v.hasReplied
                })
                console.log(v, "LIST")
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
        setFullscreen("lg-down")
        setSelectedData({
            data: {
                name: String(row.name),
                email: String(row.email),
                // message: row.message,
                createdDate: formatDate(String(row.createdDate))
            },
            message: String(row.message),
            reply: String(row.reply),
            hasReplied: row.hasReplied
        },)
        console.log(selectedData, "SELECTED")
        handleShow()
    };

    const fields: string[] = ['name', 'email', 'status'];

    return <>
        <Breadcrumb items={["Saran"]}/>
        <TableUI
            loading={loading}
            fields={fields}
            data={dataList}
            onView={handleView}
        />
        <Modal className={`modal-lg text-black-custom`} fullscreen={fullscreen} show={show} onHide={handleClose}>
            <Modal.Header >
                <div className={"pe-3 col-12 d-flex flex-row justify-content-between"}>
                    <Modal.Title className={"fw-bold"}>Lihat Data</Modal.Title>
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
                <Detail data={selectedData.data}/>

                <div className="col ms-2">
                    {selectedData.hasReplied == 0 &&
                        <span className="badge bg-light text-black-custom p-3">Belum Dibalas</span>}
                    {selectedData.hasReplied == 1 &&
                        <span className="badge bg-foreground text-background p-3">Sudah Dibalas</span>
                    }
                </div>

                <div>
                    <p className={"fw-bold ms-3"}>Message</p>
                    <textarea className={"form-control w-75 ms-4"}
                              disabled={true}
                              rows={6}
                              defaultValue={selectedData.message}></textarea>
                </div>


                <div className={"mb-5"}>
                    <p className={"fw-bold ms-3"}>Reply</p>
                    <textarea rows={8}
                              className={"form-control w-75 ms-4"}
                              disabled={selectedData.hasReplied == 1} defaultValue={selectedData.reply}></textarea>
                </div>
                <div className="col-10 pb-4 d-flex justify-content-end">
                    <Button type={"button"} name={"Balas"}/>
                </div>
            </Modal.Body>
        </Modal>
    </>
}
