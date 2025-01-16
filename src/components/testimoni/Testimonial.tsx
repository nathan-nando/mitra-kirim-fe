import "./testimonial.css"
import Image from "next/image";
import Link from "next/link";
import {Line} from "@/components/ui/line/Line";

export function Testimonial() {
    const header = "Testimoni Konsumen Setia"
    const description = "PT Mitra Kirim Horeca consistently delivers exceptional service and quality products, enhancing our hospitality operations seamlessly" +
        "\n- Hotel Manager"

    const list: ITestimonial[] = [
        {
            img: "person-1.jpg",
            description: "PT Mitra Kirim Horeca consistently delivers top-notch supplies for our hotel and restaurant. Their timely service and high-quality products have significantly improved our operations. We highly recommend them to anyone in the hospitality industry in Indonesia!\n",
            personName: "Ardiansyah Pratama",
            personTitle: "Owner Toko A"
        },
        {
            img: "person-2.jpg",
            description: "PT Mitra Kirim Horeca is an invaluable partner for our restaurant. Their reliability and quality have transformed how we manage supplies. I am always impressed by their efficient service and commitment to customer satisfaction. A must-try for hospitality businesses in Indonesia!\n",
            personName: "Rina Susanti",
            personTitle: "Owner Toko B"
        },
        {
            img: "person-3.jpg",
            description: "PT Mitra Kirim Horeca is crucial to our hotel’s success. Their exceptional service and top-quality supplies ensure we meet high standards consistently. Their team is always friendly and professional. We couldn’t be happier with their partnership.\n",
            personName: "Siti Rahmadani",
            personTitle: "Owner Toko C"
        },
    ]

    const card = () => {
        return list.map((v, index) => {
            return <div key={index} className={"w-25 bg-white-custom testimonial-card"}>
                <div className={"d-flex flex-column  text-left text-black-custom mt-1"}>
                    <div className={"d-flex flex-row bg-white p-4  gap-4 rounded-4"}>
                        <Image
                            src={`/images/${v.img}`}
                            alt={""} width={100} height={100}
                            className={"testimonial-image text-center"}
                        />
                        <div className="d-flex flex-column justify-content-center ">
                            <p className={"text-left fw-bold text-foreground"}>{v.personName}</p>
                        </div>
                    </div>
                    <Line size={"l"}/>
                    <p className={"mt-4  paragraph-justify"}>{v.description}</p>
                </div>
            </div>
        })
    }


    return <div className={"testimonial d-flex flex-column align-items-center"}>
        <h1>{header}</h1>
        <p className={"mt-3 text-black-custom"} style={{whiteSpace: "pre-wrap"}}>{description}</p>
        <div className={"d-flex gap-5 justify-content-center"}>
            {card()}
        </div>
        <Link href={"/testimonial"}>
            <button type="button" className="btn btn-light btn-foreground mt-5">Lihat selengkapnya</button>
        </Link>
    </div>
}

interface ITestimonial {
    description: string
    img: string
    personName: string
    personTitle: string
}
