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
            className={"text-center fw-bold fs-2"}
            style={{whiteSpace: "pre-wrap"}}>
            {getTitle()}
        </h5>
        <div className={"d-flex flex-row mt-5 hero-content"}>
            <div className={"col ms-5"}>
                <Image src={getImg()}
                       alt={""}
                       width={0}
                       height={0}
                       sizes={"100vw"}
                       style={{width: '100%', height: '68vh'}}/>
            </div>
            <div className={"col ms-5 me-5 d-inline-block align-content-center"}>
                <p className={"fs-5 hero-description"} style={{whiteSpace: "pre-wrap"}}>
                    {getDescription()}
                </p>
            </div>
        </div>
    </div>;
}
