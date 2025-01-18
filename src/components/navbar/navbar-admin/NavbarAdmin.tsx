"use client"

import "./navbar-admin.css"
import Image from "next/image";
import {useState} from "react";
import Link from "next/link";
import {NavbarAdminData, NavbarType} from "@/components/navbar/navbar-admin/NavbarAdminData";

export function NavbarAdmin() {
    const [collapseState, setCollapseState] = useState(false)

    const renderMenu = () => {
        return NavbarAdminData().map((v, i) => {
            return <ul key={i} className={"sidebar-menu"}>
                <Link href={`/admin/${v.link}`}
                      className="sidebar-link"
                      data-bs-toggle={`${v.children ? 'collapse' : ''}`}
                      data-bs-target={`#children${i}`}
                      aria-expanded="true"
                      aria-controls={`children${i}`}>
                    <i className={v.icon}>
                    </i>
                    <span>{v.title}</span>
                </Link>
                {v.children ?
                    <ul id={`children${i}`}
                        className="sidebar-dropdown list-unstyled collapse"
                        data-bs-parent="#sidebar">{
                        renderSubMenu(v.children!)
                    }</ul> : ''
                }
            </ul>
        })
    }

    const renderSubMenu = (arr: NavbarType[]) => {
        return arr?.map((v, i) => {
            return <li key={i} className="sidebar-link-sub">
                <Link href={`/admin/${v.link}`}
                      className="sidebar-link">
                    <i className={v.icon}>
                    </i>
                    <span>{v.title}</span>
                </Link>
            </li>
        })
    }

    return <nav className={`sidebar ${collapseState ? 'nav-collapsed' : ''}`}>
        <div className={"sidebar-header"}>
            <Image
                src={"/images/logo.png"} alt={"mitra kirim"}
                width={895} height={895}
            />
            <i className="bi bi-chevron-right" onClick={() => setCollapseState(!collapseState)}></i>
        </div>
        <div className={"sidebar-content"}>
            {renderMenu()}
        </div>
        <div className="sidebar-footer mb-4">
            <Link href={""} className={"sidebar-link"}>
                <i className={"bi bi-door-open-fill"}></i>
                <span>Logout</span>
            </Link>
        </div>
    </nav>
}
