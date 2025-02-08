"use client"
import "./general.css"

import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";
import {useCallback, useEffect, useState} from "react";
import {IConfiguration} from "@/app/admin/settings/model";
import HorizontalLineLoading from "@/components/ui/loading/Horizontal";
import {
    GetByTypeAPI,
    updateAppAPI,
    updateAppLogoAPI,
    updateSocialAPI,
    updateTokoAPI
} from "@/app/admin/settings/general/action";
import ButtonIcon from "@/components/ui/button/ButtonIcon";
import {toast} from "sonner";
import Image from "next/image";


export default function GeneralAdm() {

    const [dataList, setDataList] = useState<IConfiguration[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedLogo, setSelectedLogo] = useState<string>("")

    const [isEditingLogo, setIsEditingLogo] = useState<boolean>(false)
    const [isEditingAppForm, setIsEditingAppForm] = useState<boolean>(false)
    const [isEditingSocialForm, setIsEditingSocialForm] = useState<boolean>(false)
    const [isEditingTokoForm, setIsEditingTokoForm] = useState<boolean>(false)

    const autoFillForm = useCallback(() => {
        dataList?.map(config => {
            const elements = document.getElementsByName(config.key!);

            if (elements.length > 0) {
                const element = elements[0] as HTMLInputElement | HTMLTextAreaElement;
                if (config.formType === 'file') {
                    setSelectedLogo(config.value!)
                } else {
                    element.value = config.value!;
                }
            }
        });
    }, [dataList])

    const getAPI = () => {
        const listTypes: string[] = [
            "APPLICATION_CONFIG",
            "SOCIAL_MEDIA_CONFIG",
            "ONLINE_SHOP_CONFIG",
        ]
        setLoading(true)
        GetByTypeAPI(listTypes)
            .then((v => {
                console.log(v)
                setLoading(false)
                setDataList(v)
            }))
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        getAPI()
    }, [])



    useEffect(() => {
        autoFillForm()
    }, [autoFillForm]);

    const onSubmitApp = () => {
        setLoading(true)
        toast.loading("Sedang proses ....")

        const form = document.getElementById('appForm') as HTMLFormElement;
        const formData = new FormData(form);
        const formValues: { [key: string]: string | File } = {};

        let isValid = true
        formData.forEach((value, key) => {
            if (!formData.get(key))
                isValid = false
            formValues[key] = value;
        });
        if (!isValid) {
            toast.info("Lengkapi form")
            return
        }

        console.log(formValues)
        updateAppAPI(formValues)
            .then(() => {
                toast.dismiss()
                toast.success("Sukses merubah informasi aplikasi")
                getAPI()
            })
            .catch((err) => {
                toast.dismiss()
                toast.error(err.message || "Gagal merubah informasi aplikasi")
                setLoading(false)
            })
    }

    const onSubmitAppLogo = () => {
        setLoading(true)
        toast.loading("Sedang proses ....")

        const form = document.getElementById('logoForm') as HTMLFormElement;
        const formData = new FormData(form);
        if (!formData.get("appLogo")) {
            toast.info("Silahkan pilih gambar")
            return
        }

        updateAppLogoAPI(formData)
            .then(() => {
                toast.dismiss()
                toast.success("Sukses merubah logo aplikasi")
                getAPI()
            })
            .catch((err) => {
                toast.dismiss()
                toast.error(err.message || "Gagal merubah logo aplikasi")
                setLoading(false)
            })
    }

    const onSubmitSocial = () => {
        setLoading(true)
        toast.loading("Sedang proses ....")

        const form = document.getElementById('socialForm') as HTMLFormElement;
        const formData = new FormData(form);
        const formValues: { [key: string]: string | File } = {};

        let isValid = true
        formData.forEach((value, key) => {
            if (!formData.get(key))
                isValid = false
            formValues[key] = value;
        });
        if (!isValid) {
            toast.info("Lengkapi form")
            return
        }

        console.log(formValues)
        updateSocialAPI(formValues)
            .then(() => {
                toast.dismiss()
                toast.success("Sukses merubah informasi aplikasi")
                getAPI()
            })
            .catch((err) => {
                toast.dismiss()
                toast.error(err.message || "Gagal merubah informasi aplikasi")
                setLoading(false)
            })
    }

    const onSubmitToko = () => {
        setLoading(true)
        toast.loading("Sedang proses ....")

        const form = document.getElementById('tokoForm') as HTMLFormElement;
        const formData = new FormData(form);
        const formValues: { [key: string]: string | File } = {};

        let isValid = true
        formData.forEach((value, key) => {
            if (!formData.get(key))
                isValid = false
            formValues[key] = value;
        });
        if (!isValid) {
            toast.info("Lengkapi form")
            return
        }

        console.log(formValues)
        updateTokoAPI(formValues)
            .then(() => {
                toast.dismiss()
                toast.success("Sukses merubah informasi aplikasi")
                getAPI()
            })
            .catch((err) => {
                toast.dismiss()
                toast.error(err.message || "Gagal merubah informasi aplikasi")
                setLoading(false)
            })
    }


    return <>
        <Breadcrumb items={["Settings", "General"]}/>
        {loading && <HorizontalLineLoading/>}
        <div className={"d-flex flex-column gap-5"}>
            <div className="row">
                <form id={"appForm"} className={"text-black-custom mx-auto col-5"}>
                    <div className="d-flex flex-row justify-content-between">
                        <small className={"fw-bold text-foreground"}>Aplikasi</small>
                        <div className={"d-flex flex-row gap-3"}>
                            {isEditingAppForm &&
                                <ButtonIcon severity={"danger"} icon={"bi-x"} cb={() => {
                                    setIsEditingAppForm(false)
                                    autoFillForm()
                                }}/>}
                            {isEditingAppForm && < ButtonIcon severity={"primary"} icon={"bi-check"} cb={() => {
                                setIsEditingAppForm(!isEditingAppForm)
                                onSubmitApp()
                            }}/>}

                            {!isEditingAppForm && < ButtonIcon severity={"primary"} icon={"bi-pen"} cb={() => {
                                setIsEditingAppForm(!isEditingAppForm)
                            }}/>}


                        </div>
                    </div>
                    <fieldset disabled={!isEditingAppForm} className={"col mt-1"}>
                        <div className={"d-flex flex-column gap-4"}>
                            <div className={"d-flex flex-column gap-2 bi-"}>
                                <label>Nama</label>
                                <input name={"appName"} type="text" className={"form-control"}/>
                            </div>

                            <div className={"d-flex flex-column gap-2"}>
                                <label>Deskripsi Singkat</label>
                                <textarea name={"appDescription"} className={"form-control"}></textarea>
                            </div>

                        </div>
                    </fieldset>
                </form>
                <form id={"logoForm"} className={"col"}>
                    <div className="d-flex flex-row justify-content-end">
                        <div className={"d-flex flex-row gap-3"}>
                            {isEditingLogo &&
                                <ButtonIcon severity={"danger"} icon={"bi-x"} cb={() => {
                                    setIsEditingLogo(false)
                                    autoFillForm()
                                }}/>}
                            {isEditingLogo && < ButtonIcon severity={"primary"} icon={"bi-check"} cb={() => {
                                setIsEditingLogo(!isEditingLogo)
                                onSubmitAppLogo()
                            }}/>}

                            {!isEditingLogo && < ButtonIcon severity={"primary"} icon={"bi-pen"} cb={() => {
                                setIsEditingLogo(!isEditingLogo)
                            }}/>}


                        </div>
                    </div>
                    <div className={"d-flex flex-column justify-content-center align-items-center "}>
                        <div className="col">
                            {selectedLogo && <Image src={`/api/images/assets/${selectedLogo}`}
                                                    alt={"mitra kirim"}
                                                    width={100}
                                                    height={100}
                                                    className={"logo-app shadow-sm border border-4 border-light"}
                            />}
                        </div>

                        <div className={`col d-flex flex-column gap-2 ${!isEditingLogo && 'visually-hidden'}`}>
                            <label>Logo</label>
                            <input name={"appLogo"} accept="image/*" type="file" className={"form-control"}/>
                        </div>
                    </div>
                </form>
            </div>


            <form id={"socialForm"} className={"text-black-custom mx-auto col-12  mt-4"}>
                <div className="d-flex flex-row justify-content-between">
                    <small className={"fw-bold text-foreground"}>Sosial Media</small>
                    <div className={"d-flex flex-row gap-3"}>
                        {isEditingSocialForm &&
                            <ButtonIcon severity={"danger"} icon={"bi-x"} cb={() => {
                                setIsEditingSocialForm(false)
                                autoFillForm()
                            }}/>}
                        {isEditingSocialForm && < ButtonIcon severity={"primary"} icon={"bi-check"} cb={() => {
                            setIsEditingSocialForm(!isEditingSocialForm)
                            onSubmitSocial()
                        }}/>}

                        {!isEditingSocialForm && < ButtonIcon severity={"primary"} icon={"bi-pen"} cb={() => {
                            setIsEditingSocialForm(!isEditingSocialForm)
                        }}/>}

                    </div>
                </div>
                <fieldset disabled={!isEditingSocialForm} className={"col mt-1"}>
                    <div className={"row gap-4"}>
                        <div className={"col-5 d-flex flex-column gap-2"}>
                            <label><span className={"bi bi-whatsapp"}></span> Whatsapp utama</label>
                            <input type="text" className={"form-control"} name={"whatsapp"}/>
                        </div>
                        <div className={"col-5 d-flex flex-column gap-2"}>
                            <label><span className={"bi bi-instagram"}></span> Instagram</label>
                            <input type="text" className={"form-control"} name={"instagram"}/>
                        </div>
                        <div className={"col-5 d-flex flex-column gap-2"}>
                            <label><span className={"bi bi-tiktok"}></span> Tiktok</label>
                            <input type="text" className={"form-control"} name={"tiktok"}/>
                        </div>
                        <div className={"col-5 d-flex flex-column gap-2"}>
                            <label><span className={"bi bi-facebook "}></span> Facebook</label>
                            <input type="text" className={"form-control"} name={"facebook"}/>
                        </div>
                    </div>
                </fieldset>
            </form>

            <form id={"tokoForm"} className={"text-black-custom mx-auto col-12  mt-4 mb-5"}>
                <div className="d-flex flex-row justify-content-between">
                    <small className={"fw-bold text-foreground"}>Toko Online</small>
                    <div className={"d-flex flex-row gap-3"}>
                        {isEditingTokoForm &&
                            <ButtonIcon severity={"danger"} icon={"bi-x"} cb={() => {
                                setIsEditingTokoForm(false)
                                autoFillForm()
                            }}/>}
                        {isEditingTokoForm && < ButtonIcon severity={"primary"} icon={"bi-check"} cb={() => {
                            setIsEditingTokoForm(!isEditingTokoForm)
                            onSubmitToko()
                        }}/>}

                        {!isEditingTokoForm && < ButtonIcon severity={"primary"} icon={"bi-pen"} cb={() => {
                            setIsEditingTokoForm(!isEditingTokoForm)
                        }}/>}

                    </div>
                </div>
                <fieldset disabled={!isEditingTokoForm} className={"col mt-1"}>
                    <div className={"row gap-4"}>
                        <div className={"col-5 d-flex flex-column gap-2"}>
                            <label>Tokopedia</label>
                            <input type="text" className={"form-control"} name={"tokopedia"}/>
                        </div>
                        <div className={"col-5 d-flex flex-column gap-2"}>
                            <label>Shopee</label>
                            <input type="text" className={"form-control"} name={"shopee"}/>
                        </div>
                        <div className={"col-5 d-flex flex-column gap-2"}>
                            <label>Blibli</label>
                            <input type="text" className={"form-control"} name={"blibli"}/>
                        </div>
                        <div className={"col-5 d-flex flex-column gap-2"}>
                            <label>Lazada</label>
                            <input type="text" className={"form-control"} name={"lazada"}/>
                        </div>
                        <div className={"col-5 d-flex flex-column gap-2"}>
                            <label>Bukalapak</label>
                            <input type="text" className={"form-control"} name={"bukalapak"}/>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </>
}
