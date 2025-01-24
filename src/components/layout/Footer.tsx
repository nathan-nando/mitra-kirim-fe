import Link from "next/link";
import Image from "next/image";

export function Footer() {
    const title = "PT. Mitra Kirim Horeca"

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
            <div className={"d-flex flex-column gap-3"}>
                <small>Tokopedia</small>
                <small>Shopee</small>
                <small>Blibli</small>
            </div>

            <div className="col"></div>
            <Link href={"/login"}>Login</Link>
        </div>
    </div>
}
