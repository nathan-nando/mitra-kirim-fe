import Link from "next/link";
import {ButtonWhatsapp} from "@/components/ui/button/ButtonWhatsapp";

export function NavbarGuest() {
    return <nav className="p-0 navbar navbar-expand-lg navbar-light bg-light navbar-guest">
        <div className="container mt-3">
            <Link href={"/"} className={"navbar-brand "}><h5 className={"fw-bold text-foreground fs-3"}>Mitra Kirim</h5></Link>
            <ButtonWhatsapp/>
        </div>
    </nav>
}
