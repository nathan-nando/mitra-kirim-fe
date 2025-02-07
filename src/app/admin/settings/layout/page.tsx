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
            <style jsx>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }

                .form-container {
                    padding: 2rem;
                    margin: 2rem;
                    width: auto;
                }

                h2 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: #333;
                    text-align: left;
                }

                .formGroup {
                    margin-bottom: 1.5rem;
                }

                .label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                    text-align: left;
                }

                .input, .fileInput, .textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                }

                .textarea {
                    resize: vertical;
                }

                .input:focus, .fileInput:focus, .textarea:focus {
                    border-color: #0070f3;
                    outline: none;
                }

                .imagePreview {
                    margin-top: 0.5rem;
                    width: 100%;
                    height: auto;
                    max-height: 400px;
                    object-fit: cover;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }

                .submitButton {
                    margin-top: 1.5rem;
                    padding: 0.75rem 1.5rem;
                    background-color: #4F7942; /* Warna hijau yang diinginkan */
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: bold;
                }

                .submitButton:hover {
                    background-color: #3B6A3D; /* Warna hijau gelap saat dihover */
                }
            `}</style>

            <Breadcrumb items={["Settings", "Layout"]} />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Hero Settings</h2>
                    <div className="formGroup">
                        <label className="label">Deskripsi :</label>
                        <textarea
                            className="textarea"
                            rows="5"
                            value={heroDescription}
                            onChange={handleHeroDescriptionChange}
                        />
                        <label className="label">Ganti Gambar :</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="fileInput"
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
                                className="input"
                                value={service.title}
                                onChange={handleServiceChange(index, "title")}
                            />
                            <label className="label">Deskripsi Layanan {index + 1} :</label>
                            <textarea
                                className="textarea"
                                rows="3"
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
