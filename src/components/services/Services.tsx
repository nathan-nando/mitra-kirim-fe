import "./services.css"
import Image from "next/image";

export function Services() {
    const servicesList: IServices[] = [
        {
            title: "Penyediaan Bahan Berkualitas",
            description: "Respon cepat terhadap kebutuhan mendesak, keluhan, serta ketersediaan bahan berkualitas",
            image: "service-1.jpg",
        },
        {
            title: "Pengiriman Barang Secara Cepat",
            description: "Pengiriman tepat waktu memastikan waktu operasional bisnis anda tidak terganggu",
            image: "service-2.jpg",
        },
        {
            title: "Layanan Konsultasi Kebutuhan HORECA",
            description: "Solusi operasional bisnis maupun pemilihan produk.\nMembantu menemukan barang yang tepat sesuai kebutuhan dan saran profesional",
            image: "service-3.jpg",
        },
    ]

    const card = () => {
        return servicesList.map((service, index) => {
            return <div className={"w-25 bg-white-custom services-card"} key={index}>
                <Image
                    src={`/images/${service.image}`}
                    alt={""} width={500} height={0}
                    className={"service-image"}
                    style={{width: '100%', height: '48vh'}}
                />
                <div className={"text-center text-black-custom mt-4"}>
                    <h5 className={"fw-bolder text-foreground"}>{service.title}</h5>
                    <div className={"ps-5 pe-5 pb-2"}>
                    <p className={"mt-4 mb-3"}>{service.description}</p>

                    </div>
                </div>
            </div>
        })
    }

    return <div className={"services d-flex gap-5 justify-content-center"}>
        {card()}
    </div>
}

interface IServices {
    title: string
    description: string
    image: string
}
