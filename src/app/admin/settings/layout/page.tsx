"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// Components
import { Breadcrumb } from "@/components/ui/breadcrumb/breadcrumb";
import ButtonIcon from "@/components/ui/button/ButtonIcon";
import HorizontalLineLoading from "@/components/ui/loading/Horizontal";

// API
import {
    GetByTypeAPI,
    // updateServicesAPI
} from "@/app/admin/settings/general/action";
import {updateHeroAPI, updateServicesAPI} from "@/app/admin/settings/layout/action";

// Types
import { IConfiguration } from "@/app/admin/settings/model";

// Form Section Component
const FormSection = ({ title, isEditing, setIsEditing, onSubmit, onCancel, children }) => {
    return (
        <div>
            <div className="d-flex flex-row justify-content-between">
                <h5 className="fw-bold text-foreground">{title}</h5>
                <div className="d-flex flex-row gap-3">
                    {isEditing && (
                        <ButtonIcon
                            severity="danger"
                            icon="bi-x"
                            cb={onCancel}
                        />
                    )}
                    {isEditing && (
                        <ButtonIcon
                            severity="primary"
                            icon="bi-check"
                            cb={onSubmit}
                        />
                    )}
                    {!isEditing && (
                        <ButtonIcon
                            severity="primary"
                            icon="bi-pen"
                            cb={() => setIsEditing(true)}
                        />
                    )}
                </div>
            </div>
            {children}
        </div>
    );
};

export default function LayoutAdm() {
    // State for configuration data
    const [layoutConfig, setLayoutConfig] = useState({
        loading: true,
        data: [],
        heroDesc: "",
        heroImg: "",
        services: []
    });

    // Form editing states
    const [formStates, setFormStates] = useState({
        isEditingHero: false,
        isEditingService: false
    });

    // Client-side rendering state
    const [isMounted, setIsMounted] = useState(false);

    // Hero form state
    const [heroForm, setHeroForm] = useState({
        heroDesc: "",
        file: null,
        preview: ""
    });

    // Service uploads state - modified to store just the image filename without the full path
    const [serviceUploads, setServiceUploads] = useState([
        { title: "", description: "", file: null, preview: "" },
        { title: "", description: "", file: null, preview: "" },
        { title: "", description: "", file: null, preview: "" }
    ]);

    const setEditingMode = (formName, value) => {
        setFormStates(prev => ({
            ...prev,
            [formName]: value
        }));
    };

    const fetchLayoutConfiguration = useCallback(async () => {
        if (!isMounted) return; // Skip fetch during SSR

        const listTypes = ["LAYOUT_CONFIG"];

        setLayoutConfig(prev => ({ ...prev, loading: true }));

        try {
            const data = await GetByTypeAPI(listTypes);

            // Process the API response
            const heroDesc = data.find(item => item.key === "heroDesc")?.value || "";
            const heroImg = data.find(item => item.key === "heroImg")?.value || "";

            // Parse the services JSON string into an object
            const servicesData = data.find(item => item.key === "services")?.value || "[]";
            const services = JSON.parse(servicesData) || [];

            setLayoutConfig({
                loading: false,
                data,
                heroDesc,
                heroImg,
                services
            });

            // Set hero form state from API data - only store the filename
            setHeroForm({
                heroDesc,
                file: null,
                preview: heroImg // Store just the filename
            });

            // Initialize service uploads with data from API - only store the filename
            if (services.length > 0) {
                setServiceUploads(services.map(service => ({
                    title: service.title || "",
                    description: service.description || "",
                    file: null,
                    preview: service.img || "" // Store just the filename
                })));
            }

        } catch (err) {
            console.error("Failed to fetch layout configuration:", err);
            if (isMounted) {
                toast.error("Failed to load layout settings");
            }
            setLayoutConfig(prev => ({ ...prev, loading: false }));
        }
    }, [isMounted]);

    const handleHeroDescChange = (e) => {
        setHeroForm(prev => ({
            ...prev,
            heroDesc: e.target.value
        }));
    };

    const handleHeroImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setHeroForm(prev => ({
                ...prev,
                file,
                preview: URL.createObjectURL(file) // For new file uploads, we use URL.createObjectURL
            }));
        }
    };

    const handleServiceChange = (index, field) => (e) => {
        const newServices = [...serviceUploads];
        newServices[index][field] = e.target.value;
        setServiceUploads(newServices);
    };

    const handleServiceImageChange = (index) => (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newServices = [...serviceUploads];
            newServices[index].file = file;
            newServices[index].preview = URL.createObjectURL(file); // For new file uploads, we use URL.createObjectURL
            setServiceUploads(newServices);
        }
    };

    // Helper function to determine the image source
    const getImageSource = (imageName) => {
        // If the preview starts with blob: or data:, it's a new file being previewed
        if (imageName && (imageName.startsWith('blob:') || imageName.startsWith('data:'))) {
            return imageName;
        }
        // Otherwise, it's a saved image and we need to construct the path
        return imageName ? `/api/images/assets/${imageName}` : "";
    };

    const handleSubmitHero = async () => {
        setLayoutConfig(prev => ({ ...prev, loading: true }));
        toast.loading("Processing...");

        const formData = new FormData();

        // Add hero description
        formData.append("heroDesc", heroForm.heroDesc);

        // Add the hero image file if it exists
        if (heroForm.file) {
            formData.append("heroImg", heroForm.file);
        }

        console.log(heroForm)

        try {
            await updateHeroAPI(formData);
            toast.dismiss();
            toast.success("Successfully updated hero section");
            setEditingMode('isEditingHero', false);
            await fetchLayoutConfiguration();
        } catch (err:any) {
            toast.dismiss();
            toast.error(err.message || "Failed to update hero section");
            setLayoutConfig(prev => ({ ...prev, loading: false }));
        }
    };

    const handleSubmitServices = async () => {
        setLayoutConfig(prev => ({ ...prev, loading: true }));
        toast.loading("Processing...");

        // Create an array to hold the final service objects to be saved
        const services = serviceUploads.map((service, index) => {
            // Start with the base service object containing title and description
            const serviceObj = {
                title: service.title,
                description: service.description,
                img: "" // Will be populated based on file or existing image
            };

            // If there's a new file, we'll use a placeholder and let the backend handle file saving
            // The actual filename will be determined by the server
            if (service.file) {
                // We'll use a placeholder here - the actual value will be set by the backend
                serviceObj.img = `temp-${index}`; // This will be replaced by the backend
            } else if (service.preview && !service.preview.startsWith('blob:') && !service.preview.startsWith('data:')) {
                // If using an existing image (not a blob URL), keep the existing filename
                serviceObj.img = service.preview;
            }

            return serviceObj;
        });

        // Create FormData object for file uploads
        const formData = new FormData();

        // Add the stringified services JSON to formData
        formData.append("services", JSON.stringify(services));

        // Append any new files that need to be uploaded
        serviceUploads.forEach((service, index) => {
            if (service.file) {
                formData.append(`serviceFile${index}`, service.file);
            }
        });


        try {
            await updateServicesAPI(formData);
            toast.dismiss();
            toast.success("Successfully updated services section");
            setEditingMode('isEditingService', false);
            await fetchLayoutConfiguration();
        } catch (err:any) {
            toast.dismiss();
            toast.error(err.message || "Failed to update services section");
            setLayoutConfig(prev => ({ ...prev, loading: false }));
        }
    };

    const handleCancelEdit = (formName) => {
        setEditingMode(formName, false);

        // Reset form values to original values
        if (formName === 'isEditingHero') {
            setHeroForm({
                heroDesc: layoutConfig.heroDesc,
                file: null,
                preview: layoutConfig.heroImg // Store just the filename
            });
        } else if (formName === 'isEditingService') {
            // Reset service uploads to original values
            if (layoutConfig.services.length > 0) {
                setServiceUploads(layoutConfig.services.map((service:any) => ({
                    title: service.title || "",
                    description: service.description || "",
                    file: null,
                    preview: service.img || "" // Store just the filename
                })));
            }
        }
    };

    // Effects
    // This effect marks when we're client-side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // This effect only runs on the client after mounting
    useEffect(() => {
        if (isMounted) {
            fetchLayoutConfiguration();
        }
    }, [fetchLayoutConfiguration, isMounted]);

    // Skip rendering certain parts during SSR
    if (!isMounted) {
        return <div>
            <Breadcrumb items={["Settings", "Layout"]} />
            <HorizontalLineLoading />
        </div>;
    }

    return (
        <>
            <Breadcrumb items={["Settings", "Layout"]} />
            {layoutConfig.loading && <HorizontalLineLoading />}

            <div className="d-flex flex-column gap-4">
                {/* Hero Section */}
                <FormSection
                    title="Hero"
                    isEditing={formStates.isEditingHero}
                    setIsEditing={(value) => setEditingMode('isEditingHero', value)}
                    onSubmit={handleSubmitHero}
                    onCancel={() => handleCancelEdit('isEditingHero')}
                >
                    <div className="mt-3">
                        <fieldset disabled={!formStates.isEditingHero}>
                            <label className="text-black-custom">Description:</label>
                            <textarea
                                className="form-control"
                                value={heroForm.heroDesc}
                                onChange={handleHeroDescChange}
                                rows={5}
                            />

                            {formStates.isEditingHero && (
                                <>
                                    <label className="text-black-custom mt-3">Change Image:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control"
                                        onChange={handleHeroImageChange}
                                    />
                                </>
                            )}

                            {heroForm.preview && (
                                <div className="mt-2">
                                    <img
                                        src={getImageSource(heroForm.preview)}
                                        alt="Hero Preview"
                                        className="img-fluid mt-2 imagePreview"
                                        style={{ maxHeight: '200px' }}
                                    />
                                </div>
                            )}
                        </fieldset>
                    </div>
                </FormSection>

                {/* Services Section */}
                <FormSection
                    title="Main Services"
                    isEditing={formStates.isEditingService}
                    setIsEditing={(value) => setEditingMode('isEditingService', value)}
                    onSubmit={handleSubmitServices}
                    onCancel={() => handleCancelEdit('isEditingService')}
                >
                    <fieldset disabled={!formStates.isEditingService}
                              className="mt-4 d-flex flex-column gap-5 mb-5">
                        {serviceUploads.map((service, index) => (
                            <div key={index} className="d-flex flex-column gap-2">
                                <label className="text-black-custom">Service Title {index + 1}:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={service.title}
                                    onChange={handleServiceChange(index, "title")}
                                />

                                <label className="text-black-custom">Service Description {index + 1}:</label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    value={service.description}
                                    onChange={handleServiceChange(index, "description")}
                                />

                                {formStates.isEditingService && (
                                    <>
                                        <label className="text-black-custom">
                                            Change Service Image {index + 1}:
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={handleServiceImageChange(index)}
                                        />
                                    </>
                                )}

                                {service.preview && (
                                    <div className="mt-2">
                                        <img
                                            src={getImageSource(service.preview)}
                                            alt={`Service ${index + 1} Preview`}
                                            className="img-fluid mt-2 imagePreview"
                                            style={{ maxHeight: '150px' }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </fieldset>
                </FormSection>
            </div>
        </>
    );
}
