import Image from "next/image";
import "./hero.css"

export function Hero() {
    const getTitle = () => {
        const result: string = "Menjamin Pasokan Hotel Restoran dan \nKafe dengan Bahan Berkualitas"
        return result
    }

    const getDescription = () => {
        const result: string = "PT Mitra Kirim Horeca adalah perusahaan yang menyediakan berbagai kebutuhan untuk hotel, restoran, dan kafe. Kami menawarkan produk berkualitas tinggi, mulai dari peralatan dapur, perlengkapan meja, hingga bahan makanan dan minuman, yang dirancang untuk mendukung operasional bisnis hospitality Anda. " +
            "\n\nDengan pelayanan yang cepat dan profesional, PT Mitra Kirim Horeca menjadi mitra terpercaya dalam memenuhi kebutuhan sektor horeca (hotel, restoran, dan kafe) dengan harga kompetitif dan kualitas terbaik."
        return result
    }


    const getImg = () => `/images/hero.jpg`

    return <div className={"hero"}>
        <h5
            className={"text-center fw-bold "}
            style={{whiteSpace: "pre-wrap"}}>
            {getTitle()}
        </h5>
        <div className={"d-flex flex-column flex-lg-row align-items-center mt-3 mt-md-5"}>
            <div className={"col ms-0 ms-md-5"}>
                <Image src={getImg()}
                       alt={"mitra kirim"}
                       width={1000}
                       height={600}
                       className={"hero-image bg-black"}
                      />
            </div>
            <div className={"col ms-5 me-5 mt-3"}>
                <p className={"hero-description paragraph-justify"} style={{whiteSpace: "pre-wrap"}}>
                    {getDescription()}
                </p>
            </div>
        </div>
    </div>;
}
