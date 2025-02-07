"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb/breadcrumb";

export default function LayoutAdm() {
    const [heroDescription, setHeroDescription] = useState("");
    const [heroImage, setHeroImage] = useState(null);
    const [heroImageUrl, setHeroImageUrl] = useState("");

    const [serviceImages, setServiceImages] = useState([
        { title: "", description: "", image: null, imageUrl: "" },
        { title: "", description: "", image: null, imageUrl: "" },
        { title: "", description: "", image: null, imageUrl: "" }
    ]);

    const handleHeroDescriptionChange = (e) => {
        setHeroDescription(e.target.value);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika untuk mengirim data ke server atau memproses data
        console.log({
            heroDescription,
            heroImage,
            services: serviceImages
        });
    };

    return (
        <>
            <Breadcrumb items={["Settings", "Layout"]} />
            <div className="form-container">
                <form>
                    <h2>Hero Settings</h2>
                    <div className="formGroup">
                        <label className="label">Deskripsi :</label>
                        <textarea
                            className="form-control"
                            rows={5}
                            value={heroDescription}
                            onChange={handleHeroDescriptionChange}
                        />
                        <label className="label">Ganti Gambar :</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={handleHeroImageChange}
                        />
                        {heroImageUrl && (
                            <img src={heroImageUrl} alt="Hero Image" className="imagePreview" />
                        )}
                    </div>

                    <h2>Layanan Utama Settings</h2>
                    {serviceImages.map((service, index) => (
                        <div key={index} className="formGroup">
                            <label className="label">Judul Layanan {index + 1} :</label>
                            <input
                                type="text"
                                className="form-control"
                                value={service.title}
                                onChange={handleServiceChange(index, "title")}
                            />
                            <label className="label">Deskripsi Layanan {index + 1} :</label>
                            <textarea
                                className="textarea"
                                rows={3}
                                value={service.description}
                                onChange={handleServiceChange(index, "description")}
                            />
                            <label className="label">Ganti Gambar Layanan Utama {index + 1} :</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="fileInput"
                                onChange={handleServiceImageChange(index)}
                            />
                            {service.imageUrl && (
                                <img src={service.imageUrl} alt={`Service Image ${index + 1}`} className="imagePreview" />
                            )}
                        </div>
                    ))}
                    
                    <button type="submit" className="submitButton">Submit</button>
                </form>
            </div>
        </>
    );
}
