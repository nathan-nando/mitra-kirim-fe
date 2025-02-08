"use server"

import Link from "next/link";
import Image from "next/image";
import React from "react";
import {camelCaseToReadable} from "@/utils/convertCamelCase";

export async function Footer({socialMediaData, tokoData}) {
    const title = "PT. Mitra Kirim Horeca"

    console.log(socialMediaData, "SOCIAL")
    console.log(tokoData, "TOKO")

    return <div className={"footer"}>
        <div className={"d-flex flex-row text-background"}>
            <div className="col-6 col-lg-4">
                <h3>{title}</h3>
                <div className={"bg-white-custom rounded col-5 text-center mt-4"}>
                    <Image
                        className={"logo-img"}
                        src={"/images/logo.png"} alt={"mitra kirim"}
                        width={895} height={895}
                    />
                </div>
            </div>
            <div className={"d-flex col-2 flex-column gap-3"}>
                {tokoData?.map(({key, value}, i) => <div key={i}>
                    <Link href={value}><span className={"bi bi-shop"}></span> {camelCaseToReadable(key)}</Link>
                </div>)}
            </div>

            <div className={"d-flex flex-column gap-3"}>
                {socialMediaData?.map(({key, value}, i) => <div key={i}>
                    <Link href={value}><span className={`bi ${mapIcon[key]}`}></span> {camelCaseToReadable(key)}</Link>
                </div>)}
            </div>

            <div className="col"></div>
            <Link href={"/login"}>Login</Link>
        </div>
    </div>
}

const mapIcon = {
    facebook: "bi-facebook",
    instagram: "bi-instagram",
    tiktok: "bi-tiktok",
}
