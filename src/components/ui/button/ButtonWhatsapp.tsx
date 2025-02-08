export function ButtonWhatsapp({whatsappNumber}) {
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={"btn-foreground rounded border-0"}
        >
            <span className={"me-1 bi bi-whatsapp"}></span> <b>Hubungi Kami</b>
        </a>
    );
}
