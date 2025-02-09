"use client";

import "./account.css"
import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";
import React, {useEffect, useState} from "react";
import HorizontalLineLoading from "@/components/ui/loading/Horizontal";
import ButtonIcon from "@/components/ui/button/ButtonIcon";
import {getUserAPI, updateUserAPI, updateUserPictureAPI} from "@/app/admin/settings/account/action";
import Image from "next/image";
import {toast} from "sonner";
import {addLocationAPI, updateLocationAPI} from "@/app/admin/location/action";

interface IUser {
    name: string;
    username: string;
    title: string;
    email: string;
    phone: string;
    img: string;
    status: number;
    password: string;
}

export default function AccountAdm() {
    const [user, setUser] = useState<IUser>({
        name: '',
        username: '',
        title: '',
        email: '',
        phone: '',
        img: '',
        status: 0,
        password: ''
    });

    const [formState, setFormState] = useState<IUser>({
        name: '',
        username: '',
        title: '',
        email: '',
        phone: '',
        img: '',
        status: 0,
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [isEditingForm, setIsEditingForm] = useState(false);
    const [isEditingPicture, setIsEditingPicture] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file)
            setNewProfilePicture(URL.createObjectURL(file));
        }
    };

    const getAPI = () => {
        setLoading(true);
        getUserAPI()
            .then((userData: IUser) => {
                setUser({...user, ...userData});
                setFormState({...user, ...userData});
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getAPI();
    }, []);

    const onSubmitPicture = async () => {
        if (!selectedFile) {
            toast.warning("Tidak ada perubahan gambar")
            return
        }
        const formData = new FormData
        formData.append("img", selectedFile)
        console.log(formData)
        toast.loading("Loading...")
        const ok = await updateUserPictureAPI(formData).catch((err) => {
            console.log(err)
        })
        toast.dismiss()
        setNewProfilePicture("")
        setSelectedFile(undefined)

        if (!ok) {
            toast.error("Gagal upload file")
            return
        }

        toast.success("Berhasil mengubah gambar")
        getAPI()
    };

    const onSubmitForm = async () => {
        setLoading(true)

        let isValid: boolean = true
        let dataForm: any = {}

        Object.keys(formState).map(key => {
            if (!formState[key]) {
                console.log(key)
                console.log(formState[key])
                isValid = false
            }
        })

        if (!isValid) {
            toast.error("Isi semua form")
            return
        }

        toast.loading("Loading...")
        const ok = await updateUserAPI(formState).catch((err) => {
            console.log(err)
        })
        toast.dismiss()

        if (!ok) {
            toast.error("Password salah")
            return
        }

        toast.success("Berhasil mengubah informasi akun")
        getAPI()

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <Breadcrumb items={["Settings", "Account"]}/>
            {loading && <HorizontalLineLoading/>}
            <form>
                {user.img && !newProfilePicture && (
                    <div className="d-flex justify-content-center">
                        <Image
                            className="shadow-sm border-light user-picture"
                            width={200}
                            height={200}
                            src={`/api/images/users/${user.img}`}
                            alt="user-img"
                        />
                    </div>
                )}

                {newProfilePicture && (
                    <div className="d-flex justify-content-center">
                        <Image
                            className="shadow-sm border-light user-picture"
                            width={200}
                            height={200}
                            src={newProfilePicture}
                            alt="user-img"
                        />
                    </div>
                )}

                <div className="d-flex flex-row justify-content-center mt-3">
                    <div className="d-flex flex-row gap-3">
                        {isEditingPicture && (
                            <ButtonIcon
                                severity="danger"
                                icon="bi-x"
                                cb={() => {
                                    setIsEditingPicture(false);
                                    setNewProfilePicture("");
                                }}
                            />
                        )}
                        {isEditingPicture && (
                            <ButtonIcon
                                severity="primary"
                                icon="bi-check"
                                cb={async () => {
                                    setIsEditingPicture(false);
                                    await onSubmitPicture();
                                }}
                            />
                        )}
                        {!isEditingPicture && (
                            <ButtonIcon
                                severity="primary"
                                icon="bi-pen"
                                cb={() => setIsEditingPicture(true)}
                            />
                        )}
                    </div>
                </div>

                {isEditingPicture && (
                    <div className="d-flex flex-column gap-2 mt-3 col-12 align-items-center">
                        <div className="col-6">
                            <label htmlFor="profile-picture">Change Profile Picture:</label>
                            <input
                                type="file"
                                id="profile-picture"
                                accept="image/*"
                                disabled={!isEditingPicture}
                                onChange={handleProfilePictureChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                )}
            </form>

            <form className="text-black-custom col-10 mt-5 ms-3">
                <div className="d-flex flex-row justify-content-between col-10">
                    <small className="fw-bold text-foreground">Account Information</small>
                    <div className="d-flex flex-row gap-3">
                        {isEditingForm && (
                            <ButtonIcon
                                severity="danger"
                                icon="bi-x"
                                cb={() => {
                                    setIsEditingForm(false)
                                    setFormState(user)
                                }
                                }
                            />
                        )}
                        {isEditingForm && (
                            <ButtonIcon
                                severity="primary"
                                icon="bi-check"
                                cb={() => {
                                    onSubmitForm()
                                    setIsEditingForm(false)
                                }
                                }
                            />
                        )}
                        {!isEditingForm && (
                            <ButtonIcon
                                severity="primary"
                                icon="bi-pen"
                                cb={() => setIsEditingForm(true)}
                            />
                        )}
                    </div>
                </div>

                <fieldset disabled={!isEditingForm} className="col mt-4">
                    <div className="row gap-4">
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Name</label>
                            <input
                                onChange={handleChange}
                                value={formState.name}
                                type="text"
                                className="form-control"
                                name="name"
                            />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Role</label>
                            <input
                                onChange={handleChange}
                                value={formState.title}
                                type="text"
                                className="form-control"
                                name="title"
                            />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Email</label>
                            <input
                                onChange={handleChange}
                                value={formState.email}
                                type="text"
                                className="form-control"
                                name="email"
                            />
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Phone</label>
                            <input
                                onChange={handleChange}
                                value={formState.phone}
                                type="text"
                                className="form-control"
                                name="phone"
                            />
                        </div>
                    </div>

                    <div className="row gap-4 mt-5 mb-5">
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Username</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text bi bi-person" id="basic-addon1"></span>
                                <input
                                    onChange={handleChange}
                                    value={formState.username}
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    aria-label="username"
                                    aria-describedby="basic-addon1"
                                />
                            </div>
                        </div>
                        <div className="col-5 d-flex flex-column gap-2">
                            <label>Password</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text bi bi-key" id="basic-addon1"></span>
                                <input
                                    onChange={handleChange}
                                    value={formState.password}
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    aria-label="password"
                                    aria-describedby="basic-addon1"
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </>
    );
}
