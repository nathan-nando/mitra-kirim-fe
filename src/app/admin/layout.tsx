import {NavbarAdmin} from "@/components/navbar/navbar-admin/NavbarAdmin";
import React from "react";
import "./layout.css"

export default function AdminLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <div className="d-flex flex-row">
            <NavbarAdmin/>
            <div className={"admin-page-wrapper"}>
                <div className={"admin-page"}>
                    {children}
                </div>
            </div>
        </div>
    )
}
