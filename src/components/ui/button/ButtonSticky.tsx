// components/StickyComponent.js
import './button.css';
import Link from "next/link";

export const ButtonSticky = ({whatsappNumber}) => {
    return (<Link href={`https://wa.me/${whatsappNumber}`}>
            <button className={"btn-sticky"}>
                <span className={"bi bi-whatsapp"}></span>
            </button>
        </Link>
    );
}
