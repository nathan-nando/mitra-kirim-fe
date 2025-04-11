"use client"
import "./general.css"
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

// Components
import { Breadcrumb } from "@/components/ui/breadcrumb/breadcrumb";
import HorizontalLineLoading from "@/components/ui/loading/Horizontal";
import ButtonIcon from "@/components/ui/button/ButtonIcon";

// API
import {
    GetByTypeAPI,
    updateAppLogoAPI,
    updateConfigurationAPI
} from "@/app/admin/settings/general/action";

// Form Components
const FormSection = ({ title, isEditing, setIsEditing, onSubmit, onCancel, children, id }) => {
    return (
        <form id={id} className="text-black-custom mx-auto col-12 mt-4">
            <div className="d-flex flex-row justify-content-between">
                <small className="fw-bold text-foreground">{title}</small>
                <div className="d-flex flex-row gap-3">
                    {isEditing && (
                        <ButtonIcon severity="danger" icon="bi-x" cb={onCancel} />
                    )}
                    {isEditing && (
                        <ButtonIcon severity="primary" icon="bi-check" cb={onSubmit} />
                    )}
                    {!isEditing && (
                        <ButtonIcon severity="primary" icon="bi-pen" cb={() => setIsEditing(true)} />
                    )}
                </div>
            </div>
            <fieldset disabled={!isEditing} className="col mt-1">
                {children}
            </fieldset>
        </form>
    );
};

// Main Component
export default function GeneralAdm() {
    // State declarations
    const [configurations, setConfigurations] = useState({
        loading: true,
        data: [],
        selectedLogo: ""
    });

    // New state for image preview
    const [imagePreview, setImagePreview] = useState("");

    const [formStates, setFormStates] = useState({
        isEditingLogo: false,
        isEditingAppForm: false,
        isEditingSocialForm: false,
        isEditingTokoForm: false
    });

    // Fetch data from API
    const fetchConfigurations = useCallback(async () => {
        const listTypes = [
            "APPLICATION_CONFIG",
            "SOCIAL_MEDIA_CONFIG",
            "ONLINE_SHOP_CONFIG",
        ];

        setConfigurations(prev => ({ ...prev, loading: true }));

        try {
            const data = await GetByTypeAPI(listTypes);
            setConfigurations({
                loading: false,
                data,
                selectedLogo: data.find(config => config.formType === 'file')?.value || ""
            });
        } catch (err) {
            console.error("Failed to fetch configurations:", err);
            setConfigurations(prev => ({ ...prev, loading: false }));
            toast.error("Failed to load settings");
        }
    }, []);

    // Fill forms with existing data
    const autoFillForm = useCallback(() => {
        configurations.data.forEach((config: any) => {
            const elements = document.getElementsByName(config.key);

            if (elements.length > 0) {
                const element = elements[0] as HTMLInputElement | HTMLTextAreaElement;
                if (config.formType === 'file') {
                    setConfigurations(prev => ({ ...prev, selectedLogo: config.value || "" }));
                } else {
                    element.value = config.value || "";
                }
            }
        });
    }, [configurations.data]);

    // Set editing mode for a specific form
    const setEditingMode = (formName, value) => {
        setFormStates(prev => ({
            ...prev,
            [formName]: value
        }));

        // Clear image preview when exiting edit mode
        if (formName === 'isEditingLogo' && !value) {
            setImagePreview("");
        }
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a preview URL for the selected image
            const objectUrl = URL.createObjectURL(file);
            setImagePreview(objectUrl);
        }
    };

    // Generic form submission handler
    const handleSubmitForm = async (formId, formStateName, successMessage) => {
        setConfigurations(prev => ({ ...prev, loading: true }));
        toast.loading("Processing...");

        const form = document.getElementById(formId) as HTMLFormElement;
        const formData = new FormData(form);

        // For logo form, handle differently
        if (formId === 'logoForm') {
            if (!formData.get("appLogo")) {
                toast.dismiss();
                toast.info("Please select an image");
                setConfigurations(prev => ({ ...prev, loading: false }));
                return;
            }

            try {
                await updateAppLogoAPI(formData);
                toast.dismiss();
                toast.success(successMessage);
                setEditingMode(formStateName, false);
                // Clear image preview after successful upload
                setImagePreview("");
                await fetchConfigurations();
            } catch (err:any) {
                toast.dismiss();
                toast.error(err.message || "Failed to update");
                setConfigurations(prev => ({ ...prev, loading: false }));
            }
            return;
        }

        // For regular configuration forms
        const formValues = {};
        let isValid = true;

        formData.forEach((value, key) => {
            if (!value) isValid = false;
            formValues[key] = value;
        });

        if (!isValid) {
            toast.dismiss();
            toast.info("Please complete all fields");
            setConfigurations(prev => ({ ...prev, loading: false }));
            return;
        }

        try {
            await updateConfigurationAPI(formValues);
            toast.dismiss();
            toast.success(successMessage);
            setEditingMode(formStateName, false);
            await fetchConfigurations();
        } catch (err:any) {
            toast.dismiss();
            toast.error(err.message || "Failed to update");
            setConfigurations(prev => ({ ...prev, loading: false }));
        }
    };

    // Cancel edit and reset form
    const handleCancelEdit = (formName) => {
        setEditingMode(formName, false);
        // Clear image preview on cancel for logo form
        if (formName === 'isEditingLogo') {
            setImagePreview("");
        }
        autoFillForm();
    };

    // Cleanup function to revoke object URLs when component unmounts or when preview changes
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // Effects
    useEffect(() => {
        fetchConfigurations();
    }, [fetchConfigurations]);

    useEffect(() => {
        if (configurations.data.length > 0) {
            autoFillForm();
        }
    }, [configurations.data, autoFillForm]);

    return (
        <>
            <Breadcrumb items={["Settings", "General"]} />
            {configurations.loading && <HorizontalLineLoading />}

            <div className="d-flex flex-column gap-5">
                {/* App Info and Logo Section */}
                <div className="row">
                    {/* Application Form */}
                    <form id="appForm" className="text-black-custom mx-auto col-5">
                        <div className="d-flex flex-row justify-content-between">
                            <small className="fw-bold text-foreground">Application</small>
                            <div className="d-flex flex-row gap-3">
                                {formStates.isEditingAppForm && (
                                    <ButtonIcon
                                        severity="danger"
                                        icon="bi-x"
                                        cb={() => handleCancelEdit('isEditingAppForm')}
                                    />
                                )}
                                {formStates.isEditingAppForm && (
                                    <ButtonIcon
                                        severity="primary"
                                        icon="bi-check"
                                        cb={() => handleSubmitForm('appForm', 'isEditingAppForm', 'Sukses mengubah informasi aplikasi')}
                                    />
                                )}
                                {!formStates.isEditingAppForm && (
                                    <ButtonIcon
                                        severity="primary"
                                        icon="bi-pen"
                                        cb={() => setEditingMode('isEditingAppForm', true)}
                                    />
                                )}
                            </div>
                        </div>

                        <fieldset disabled={!formStates.isEditingAppForm} className="col mt-1">
                            <div className="d-flex flex-column gap-4">
                                <div className="d-flex flex-column gap-2">
                                    <label>Name</label>
                                    <input name="appName" type="text" className="form-control" />
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <label>Short Description</label>
                                    <textarea name="appDescription" className="form-control"></textarea>
                                </div>
                            </div>
                        </fieldset>
                    </form>

                    {/* Logo Form */}
                    <form id="logoForm" className="col">
                        <div className="d-flex flex-row justify-content-end">
                            <div className="d-flex flex-row gap-3">
                                {formStates.isEditingLogo && (
                                    <ButtonIcon
                                        severity="danger"
                                        icon="bi-x"
                                        cb={() => handleCancelEdit('isEditingLogo')}
                                    />
                                )}
                                {formStates.isEditingLogo && (
                                    <ButtonIcon
                                        severity="primary"
                                        icon="bi-check"
                                        cb={() => handleSubmitForm('logoForm', 'isEditingLogo', 'Sukses mengubah logo aplikasi')}
                                    />
                                )}
                                {!formStates.isEditingLogo && (
                                    <ButtonIcon
                                        severity="primary"
                                        icon="bi-pen"
                                        cb={() => setEditingMode('isEditingLogo', true)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div className="col">
                                {formStates.isEditingLogo && imagePreview ? (
                                    // Show preview of the selected image when in edit mode
                                    <Image
                                        src={imagePreview}
                                        alt="logo preview"
                                        width={100}
                                        height={100}
                                        className="logo-app shadow-sm border border-4 border-light"
                                    />
                                ) : configurations.selectedLogo ? (
                                    // Show the current logo when not editing or no new image selected
                                    <Image
                                        src={`/api/images/assets/${configurations.selectedLogo}`}
                                        alt="mitra kirim"
                                        width={100}
                                        height={100}
                                        className="logo-app shadow-sm border border-4 border-light"
                                    />
                                ) : null}
                            </div>
                            <div className={`col d-flex flex-column gap-2 ${!formStates.isEditingLogo && 'visually-hidden'}`}>
                                <label>Logo</label>
                                <input
                                    name="appLogo"
                                    accept="image/*"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Social Media Section */}
                <FormSection
                    id="socialForm"
                    title="Social Media"
                    isEditing={formStates.isEditingSocialForm}
                    setIsEditing={(value) => setEditingMode('isEditingSocialForm', value)}
                    onSubmit={() => handleSubmitForm('socialForm', 'isEditingSocialForm', 'Sukses mengubah informasi social media')}
                    onCancel={() => handleCancelEdit('isEditingSocialForm')}
                >
                    <div className="row gap-4">
                        <div className="col-5 d-flex flex-column gap-2">
                            <label><span className="bi bi-whatsapp"></span> Main WhatsApp</label>
                            <input type="text" className="form-control" name="whatsapp" />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label><span className="bi bi-instagram"></span> Instagram</label>
                            <input type="text" className="form-control" name="instagram" />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label><span className="bi bi-tiktok"></span> TikTok</label>
                            <input type="text" className="form-control" name="tiktok" />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label><span className="bi bi-facebook"></span> Facebook</label>
                            <input type="text" className="form-control" name="facebook" />
                        </div>
                    </div>
                </FormSection>

                {/* Online Shop Section */}
                <FormSection
                    id="tokoForm"
                    title="Online Shop"
                    isEditing={formStates.isEditingTokoForm}
                    setIsEditing={(value) => setEditingMode('isEditingTokoForm', value)}
                    onSubmit={() => handleSubmitForm('tokoForm', 'isEditingTokoForm', 'Sukses mengubah informasi toko')}
                    onCancel={() => handleCancelEdit('isEditingTokoForm')}
                >
                    <div className="row gap-4">
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Tokopedia</label>
                            <input type="text" className="form-control" name="tokopedia" />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Shopee</label>
                            <input type="text" className="form-control" name="shopee" />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Blibli</label>
                            <input type="text" className="form-control" name="blibli" />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Lazada</label>
                            <input type="text" className="form-control" name="lazada" />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Bukalapak</label>
                            <input type="text" className="form-control" name="bukalapak" />
                        </div>
                    </div>
                </FormSection>
            </div>
        </>
    );
}
