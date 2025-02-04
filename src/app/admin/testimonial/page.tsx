"use client"
import {formatDate} from "@/utils/date";
import {Detail} from "@/components/ui/detail/Detail";
import {TableUI} from "@/components/ui/table/Table";
import {Modal} from "react-bootstrap";
import {modalHeader} from "@/utils/modal";
import {useState} from "react";
import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";

type TableRow = {
    [key: string]: string | number;
};

type DetailData = {
    name: string
    createdDate: Date | string
}

type SelectedData = {
    data?: DetailData
    message?: string
    reply?: string
    hasReply?: number
}

export default function TestimonialAdm() {
    const [dataList, setDataList] = useState([])
    const [selectedData, setSelectedData] = useState<SelectedData>({})
    const [loading, setLoading] = useState(false)
    //v view, a add, u update
    const [modeModal, setModal] = useState<"a" | "u" | "v">("v")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleView = (row) => {
        setModal("v")
        setSelectedData({
            data: {
                name: String(row.nama),
                createdDate: formatDate(String(row.createdDate))
            },
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

    return <>
        <Breadcrumb items={["Testimoni"]}/>
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
                <Detail data={selectedData.data}/>
            </Modal.Body>
        </Modal>
    </>
}
