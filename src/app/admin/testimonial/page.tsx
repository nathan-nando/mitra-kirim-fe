"use client"
import {TableUI} from "@/components/ui/table/Table";
import {Modal} from "react-bootstrap";
import {modalHeader} from "@/utils/modal";
import React, {useEffect, useState} from "react";
import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import {toast} from "sonner";
import {addTestimonialAPI, changeStatusAPI, deleteAPI, getTestimonialAPI} from "@/app/admin/testimonial/action";
import {Detail} from "@/components/ui/detail/Detail";


type ITestimonial = {
    id?: number
    nama?: string
    img?: string
    deskripsi?: string
    slide?: number
    createdDate?: string
    createdBy?: string
    updatedBy?: string
    updatedDate?: string
}

export default function TestimonialAdm() {
    const [dataList, setDataList] = useState<ITestimonial[]>([])
    const [selectedData, setSelectedData] = useState<ITestimonial>({})
    const [loading, setLoading] = useState(false)
    const [selectedImg, setSelectedImg] = useState("");


    //v view, a add, u update
    const [modeModal, setModal] = useState<"a" | "u" | "v">("v")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleView = (data: ITestimonial) => {
        setModal("v")
        setSelectedData(data)
        setSelectedImg(`testimonials/${data.img!}`)
        handleShow()
    };

    const resetForm = () => {
        const form = document.getElementById('testimonialForm') as HTMLFormElement;
        if (form) {
            form.reset()
        }
        setSelectedImg("")

    }
    const handleAdd = () => {
        setModal("a")
        handleShow()
        resetForm()
    }
    const handleDelete = (data) => {
        deleteTestimoniAPI(data.id)
            .then(() => {

            })
            .catch(() => {
                console.log("Failed delete testimonial")
            })
    }
    const handleSwitch = async (data: ITestimonial, newValue: boolean) => {
        const updatedData = [...dataList]
        const updatedIndex = dataList.findIndex(v => v.id === data.id)
        const updatedValue = newValue ? 1 : 0
        await toggleAPI(data.id!, updatedValue)
        updatedData[updatedIndex].slide = updatedValue
        setDataList(updatedData)
    }

    const onImgChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImg(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        setLoading(true)
        getAllAPI()
    }, [])

    const getAllAPI = () => {
        getTestimonialAPI(0, 100)
            .then((data) => {
                setDataList(data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    const toggleAPI = async (id: number, value: number) => {
        toast.loading("Loading...")
        setLoading(true)

        const ok = await changeStatusAPI(id, value)
        if (ok) {
            toast.dismiss()
            toast.success("Berhasil mengubah status slide")
            getAllAPI()
            return
        }
        toast.dismiss()
        toast.error("Gagal mengubah status slide")
        setLoading(false)
        return false
    }
    const deleteTestimoniAPI = async (id: number) => {
        toast.loading("Loading...")
        setLoading(true)

        const ok = await deleteAPI(id)
        if (ok) {
            toast.dismiss()
            toast.success("Berhasil Menghapus testimoni")
            getAllAPI()
            return
        }
        toast.dismiss()
        toast.error("Gagal Menghapus testimoni")
        setLoading(false)
        return false
    }

    const renderForm = () => {
        return <>
            <form action={async (formData: FormData) => {
                let isValid: boolean = true
                formData.forEach((_, key) => {
                    if (!formData.get(key)) {
                        isValid = false
                    }
                })

                if (selectedImg === "") {
                    isValid = false
                }


                if (!isValid) {
                    toast.error("Isi semua form")
                    return
                }
                toast.loading("Loading....")
                const ok = await addTestimonialAPI(formData)
                toast.dismiss()
                resetForm()
                if (!ok) {
                    toast.error("Gagal menambah testimoni")
                    return
                }
                toast.success("Berhasil menambah testimoni")
                handleClose()
                getAllAPI()

            }} id={"testimonialForm"} className={"d-flex flex-column gap-3 col-10 p-2 ps-5 h-50"}>
                <div className={"d-flex flex-column gap-2 col-10"}>
                    <label>Nama</label>
                    <input type="text" name={"nama"} className={"form-control"}/>
                </div>
                <div className={"d-flex flex-column gap-2 col-10"}>
                    <label>Deskripsi</label>
                    <textarea name={"deskripsi"} rows={3} className={"form-control"}></textarea>
                </div>
                <div className={"d-flex flex-column gap-2 col-10"}>
                    <label>Gambar Testimoni</label>
                    <input onChange={onImgChange} accept="image/*" type="file" name={"img"} className={"form-control"}/>
                </div>
                {selectedImg && (
                    <div className="profile-picture-preview">
                        <Image
                            className={"shadow-sm border rounded"}
                            src={selectedImg}
                            width={200}
                            height={200}
                            alt="Profile Preview"
                        />
                    </div>
                )}
                <div className={"col-lg-10  mt-4 d-flex justify-content-end"}>
                    <Button name={"Save"} type={"submit"}/>
                </div>
            </form>
        </>
    }

    const fields: string[] = ['nama', 'deskripsi', 'slide'];

    return <>
        <Breadcrumb items={["Testimoni"]}/>
        <TableUI
            loading={loading}
            fields={fields}
            data={dataList}
            onView={handleView}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onSwitchChange={handleSwitch}
        />
        <Modal className={"modal-lg text-black-custom"} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className={"fw-bold"}>{modalHeader(modeModal)}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"col-12 d-flex flex-column gap-3"}>
                {modeModal === "v" && <Detail data={selectedData}/>}
                {selectedImg && <Image src={`/api/images/${selectedImg}`}
                                       alt={"mitra kirim"}
                                       width={400}
                                       height={200}
                                       className={"shadow-sm border border-4 border-light mb-4 ms-3"}
                />}
                {(modeModal === "a" || modeModal === "u") && renderForm()}
            </Modal.Body>
        </Modal>
    </>
}
