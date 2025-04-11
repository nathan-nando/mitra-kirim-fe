"use server"

import Link from "next/link";
import Image from "next/image";
import React from "react";
import {capitalizeWords} from "@/utils/capitilize";
import {cookies} from "next/headers";

export async function Footer({appName,appLogo, socialMediaData, tokoData}) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("X_APP_1")?.value

    return <div className={"footer"}>
        <div className={"d-flex flex-row text-background"}>
            <div className="col-6 col-lg-4">
                <h5>{appName}</h5>
                <div className={"footer-logo rounded col-5 text-center mt-4"}>
                    <Image
                        className={"logo-img"}
                        src={`/api/images/assets/${appLogo}`} alt={"mitra kirim"}
                        width={895} height={895}
                    />
                </div>
            </div>
            <div className={"d-flex col-2 flex-column gap-3"}>
                {tokoData?.map(({key, value}, i) => <div key={i}>
                    <Link href={value}><span className={"bi bi-shop"}></span> {capitalizeWords(key)}</Link>
                </div>)}
            </div>

            <div className={"d-flex flex-column gap-3"}>
                {socialMediaData?.map(({key, value}, i) => <div key={i}>
                    <Link href={value}><span className={`bi ${mapIcon[key]}`}></span> {capitalizeWords(key)}</Link>
                </div>)}
            </div>

            <div className="col"></div>
            {accessToken ?  <Link href={"/admin"}><small>Back to Dashboard</small></Link>: <Link href={"/login"}>Login</Link>}
        </div>
    </div>
}

const mapIcon = {
    facebook: "bi-facebook",
    instagram: "bi-instagram",
    tiktok: "bi-tiktok",
}
