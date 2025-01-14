import Link from "next/link";
import {ButtonWhatsapp} from "@/components/ui/button/ButtonWhatsapp";
import Image from "next/image";

export function NavbarGuest() {
    return <nav className="p-0 navbar navbar-expand-lg navbar-light bg-light navbar-guest">
        <div className="container d-flex">
            <Link href={"/"} className={"navbar-brand "}>
                <h5 className={"fw-bold text-foreground fs-5"}>Mitra Kirim Horeca</h5>
            </Link>
            <Image src={"/images/logo.png"} alt={""} width={150} height={150}/>
            <ButtonWhatsapp/>
        </div>
    </nav>
}
