import "./testimonial.css"
import Image from "next/image";
import Link from "next/link";

export function Testimonial() {
    const header = "Testimoni Konsumen Setia"
    const description = "PT Mitra Kirim Horeca consistently delivers exceptional service and quality products, enhancing our hospitality operations seamlessly" +
        "\n- Hotel Manager"

    const list: ITestimonial[] = [
        {
            img: "person-1.jpg",
            description: "PT Mitra Kirim Horeca consistently delivers top-notch supplies for our hotel and restaurant. Their timely service and high-quality products have significantly improved our operations. We highly recommend them to anyone in the hospitality industry in Indonesia!\n",
            personName: "Ardiansyah Pratama"
        },
        {
            img: "person-2.jpg",
            description: "PT Mitra Kirim Horeca is an invaluable partner for our restaurant. Their reliability and quality have transformed how we manage supplies. I am always impressed by their efficient service and commitment to customer satisfaction. A must-try for hospitality businesses in Indonesia!\n",
            personName: "Rina Susanti"
        },
        {
            img: "person-3.jpg",
            description: "PT Mitra Kirim Horeca is crucial to our hotel’s success. Their exceptional service and top-quality supplies ensure we meet high standards consistently. Their team is always friendly and professional. We couldn’t be happier with their partnership.\n",
            personName: "Siti Rahmadani"
        },
    ]

    const card = () => {
        return list.map((v, index) => {
            return <div key={index} className={"w-25 bg-white-custom testimonial-card"}>
                <div className={"d-flex flex-column  text-left text-black-custom mt-4"}>
                    <div className={"d-flex flex-column align-items-center gap-3"}>
                        <Image
                            src={`/images/${v.img}`}
                            alt={""} width={100} height={100}
                            className={"testimonial-image text-center"}
                        />
                        <p className={"text-center"}>{v.personName}</p>
                    </div>
                    <p className={"mt-4 mb-3 paragraph-justify"}>{v.description}</p>
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
}
