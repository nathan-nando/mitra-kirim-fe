import "./services.css"
import Image from "next/image";
import {Line} from "@/components/ui/line/Line";

type IServices = {
    title: string
    description: string
    image: string
}

export function Services({data}) {
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
            title: "Layanan Konsultasi HORECA",
            description: "Solusi operasional bisnis maupun pemilihan produk.\nMembantu menemukan barang yang tepat sesuai kebutuhan dan saran profesional",
            image: "service-2.jpg",
        },
    ]

    const card = () => {
        return servicesList.map((service, index) => {
            return <div className={"bg-white-custom services-card"} key={index}>
                <Image
                    src={`/images/${service.image}`}
                    alt={""} width={500} height={500}
                    className={"service-image"}
                />
                <div className={"text-center text-black-custom mt-4 ps-2 pe-2"}>
                    <h5 className={"fw-bolder text-foreground "}>{service.title}</h5>
                    <Line/>
                    <p className={"mt-4 mb-3"}><small>{service.description}</small></p>
                </div>
            </div>
        })
    }

    return <div className={"container services"}>
        <h4 className={"text-center"}>Layanan Utama</h4>
        <div className={"services-wrapper"}>
            {card()}
        </div>
    </div>
}

