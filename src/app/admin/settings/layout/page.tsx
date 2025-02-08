"use client";

import {useState} from "react";
import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";
import {IConfiguration} from "@/app/admin/settings/model";
import ButtonIcon from "@/components/ui/button/ButtonIcon";

export default function LayoutAdm() {
    const [dataList, setDataList] = useState<IConfiguration[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedLogo, setSelectedLogo] = useState<string>("")

    const [isEditingHero, setEditingHero] = useState<boolean>(false)
    const [isEditingService, setIsEditingService] = useState<boolean>(false)


    const [heroImage, setHeroImage] = useState(null);
    const [heroImageUrl, setHeroImageUrl] = useState("");

    const [serviceImages, setServiceImages] = useState([
        {title: "", description: "", image: null, imageUrl: ""},
        {title: "", description: "", image: null, imageUrl: ""},
        {title: "", description: "", image: null, imageUrl: ""}
    ]);

    const handleHeroImageChange = (e) => {
        setHeroImage(e.target.files[0]);
        setHeroImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleServiceChange = (index, field) => (e) => {
        const newServices = [...serviceImages];
        newServices[index][field] = e.target.value;
        setServiceImages(newServices);
    };

    const handleServiceImageChange = (index) => (e) => {
        const newServices = [...serviceImages];
        newServices[index].image = e.target.files[0];
        newServices[index].imageUrl = URL.createObjectURL(e.target.files[0]);
        setServiceImages(newServices);
    };

    const onSubmitHero = () => {

    }

    const onSubmitService = () => {

    }

    return (
        <>
            <Breadcrumb items={["Settings", "Layout"]}/>
            <div className="d-flex flex-column gap-4">
                <div>
                    <div className="d-flex flex-row justify-content-between">
                        <h5 className={"fw-bold text-foreground"}>Hero</h5>
                        <div className={"d-flex flex-row gap-3"}>
                            {isEditingHero &&
                                <ButtonIcon severity={"danger"} icon={"bi-x"} cb={() => {
                                    setEditingHero(false)
                                    // autoFillForm()
                                }}/>}
                            {isEditingHero && < ButtonIcon severity={"primary"} icon={"bi-check"} cb={() => {
                                setEditingHero(!isEditingHero)
                                onSubmitHero()
                            }}/>}

                            {!isEditingHero && < ButtonIcon severity={"primary"} icon={"bi-pen"} cb={() => {
                                setEditingHero(!isEditingHero)
                            }}/>}
                        </div>
                    </div>
                    <form id={"heroForm"}>
                        <fieldset disabled={!isEditingHero} className="mt-3">
                            <label className="text-black-custom">Deskripsi :</label>
                            <textarea
                                className="form-control"
                                name={"deskripsi"}
                                rows={5}
                            ></textarea>
                            <label className="text-black-custom mt-3">Ganti Gambar :</label>
                            <input
                                type="file"
                                accept="image/*"
                                name={"img"}
                                className="form-control"
                                onChange={handleHeroImageChange}
                            />
                            {heroImageUrl && (
                                <img src={heroImageUrl} alt="Hero Image" className="imagePreview"/>
                            )}
                        </fieldset>
                    </form>
                </div>

                <div>
                    <div className="d-flex flex-row justify-content-between mt-5">
                        <h5 className={"fw-bold text-foreground"}>Layanan Utama</h5>
                        <div className={"d-flex flex-row gap-3"}>
                            {isEditingService &&
                                <ButtonIcon severity={"danger"} icon={"bi-x"} cb={() => {
                                    setIsEditingService(false)
                                    // autoFillForm()
                                }}/>}
                            {isEditingService && < ButtonIcon severity={"primary"} icon={"bi-check"} cb={() => {
                                setIsEditingService(!isEditingService)
                                onSubmitService()
                            }}/>}

                            {!isEditingService && < ButtonIcon severity={"primary"} icon={"bi-pen"} cb={() => {
                                setIsEditingService(!isEditingService)
                            }}/>}
                        </div>
                    </div>
                    <form id={"servicesForm"}>
                        <fieldset disabled={!isEditingService} className={"mt-4 d-flex flex-column gap-5 mb-5"}>
                            {serviceImages.map((service, index) => (
                                <div key={index} className="d-flex flex-column gap-2">
                                    <label className="text-black-custom">Judul Layanan {index + 1} :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={service.title}
                                        onChange={handleServiceChange(index, "title")}
                                    />
                                    <label className="text-black-custom">Deskripsi Layanan {index + 1} :</label>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        value={service.description}
                                        onChange={handleServiceChange(index, "description")}
                                    />
                                    <label className="text-black-custom">Ganti Gambar Layanan
                                        Utama {index + 1} :</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control"
                                        onChange={handleServiceImageChange(index)}
                                    />
                                    {service.imageUrl && (
                                        <img src={service.imageUrl}
                                             alt={`Service Image ${index + 1}`}
                                             className="imagePreview"/>
                                    )}
                                </div>
                            ))}
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
        ;
}
