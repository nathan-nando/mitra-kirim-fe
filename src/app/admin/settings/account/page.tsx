"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb/breadcrumb";
import { useState } from "react";

export default function AccountAdm() {
    const [newPassword, setNewPassword] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewProfilePicture(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Proses penggantian password dan foto profil
        console.log("New password: ", newPassword);
        console.log("New profile picture: ", newProfilePicture);
    };

    return (
        <>
            <style jsx>{`
                .account-settings-container {
                    padding: 2rem;
                    max-width: 600px;
                    margin-left: 0;
                    margin-right: 0;
                    background-color: transparent;
                    box-shadow: none;
                }

                .section-title {
                    font-size: 1.8rem;
                    margin-bottom: 1.5rem;
                    color: #333;
                    text-align: left;
                }

                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                label {
                    font-size: 1rem;
                    color: #555;
                    text-align: left;
                }

                .input-field,
                .file-input {
                    padding: 0.8rem;
                    border-radius: 6px;
                    border: 1px solid #ccc;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s;
                    width: 100%;
                }

                .input-field:focus,
                .file-input:focus {
                    border-color: #4CAF50;
                }

                .profile-picture-preview {
                    margin-top: 1rem;
                    display: flex;
                    justify-content: flex-start;
                }

                .profile-preview {
                    max-width: 150px;
                    max-height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .submit-btn {
                    padding: 1rem;
                    background-color: #4F7942;;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    align-self: flex-start;
                    width: auto;
                    margin-top: 1rem;
                }

                .submit-btn:hover {
                    background-color:rgb(71, 107, 60);;
                }
            `}</style>
            <Breadcrumb items={["Settings", "Account"]} />
            <div className="account-settings-container">
                <h2 className="section-title">Update Account Details</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label htmlFor="password">New Password :</label>
                        <input
                            type="password"
                            id="password"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter new password"
                            className="input-field"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profile-picture">Change Profile Picture :</label>
                        <input
                            type="file"
                            id="profile-picture"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            className="file-input"
                        />
                        {newProfilePicture && (
                            <div className="profile-picture-preview">
                                <img
                                    src={newProfilePicture}
                                    alt="Profile Preview"
                                    className="profile-preview"
                                />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="submit-btn">
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    );
}
