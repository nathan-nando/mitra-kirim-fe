export function ButtonWhatsapp() {
    const whatsappNumber = "62859106907853"; // Ganti dengan nomor WhatsApp Anda (gunakan format internasional tanpa tanda +)
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={"btn-whatsapp rounded border-0"}
        >
            <span className={"me-1 bi bi-whatsapp"}></span>
            Hubungi Kami
        </a>
    );
}
