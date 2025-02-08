import "./navbar-guest.css"
import Link from "next/link";
import {ButtonWhatsapp} from "@/components/ui/button/ButtonWhatsapp";
import Image from "next/image";

export function NavbarGuest({whatsappNumber}) {
    return <nav className="p-0 navbar navbar-expand-lg navbar-light bg-light navbar-guest">
        <div className="container d-flex flex-row">
            <Link href={"/"} className={"navbar-brand logo-text col-lg-5"}>
                <div className={"bg-white-custom col-6 ps-4 pe-4 pb-2 pt-3 rounded-3 bg-foreground text-center"}>
                    <h5 className={"fw-bold text-white nav-title"}>PT. Mitra Kirim Horeca</h5>
                </div>
            </Link>
            <Link href={"/"} className={"col-10 col-lg-2"}>
                <Image
                    className={"logo-img"}
                    src={"/images/logo.png"} alt={"mitra kirim"}
                    width={895} height={895}
                />
            </Link>
            <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end"
                 id="navbarSupportedContent">
                <ButtonWhatsapp whatsappNumber={whatsappNumber}/>
            </div>
        </div>
    </nav>
}
