"use client"

import "./testimonial.css"
import Image from "next/image";
import {Line} from "@/components/ui/line/Line";
import {CarouselCustom} from "@/components/ui/carousel/CarouselCustom";

export function Testimonial({slides}) {
    const header = "Testimoni Konsumen Setia"
    const description = "PT Mitra Kirim Horeca consistently delivers exceptional service and quality products, enhancing our hospitality operations seamlessly" +
        "\n- Hotel Manager"

    return <div className={" testimonial "}>
        <h4 className={"text-center"}>{header}</h4>
        <blockquote style={{whiteSpace: "pre-wrap"}}>{description}</blockquote>
        {slides && <CarouselCustom slides={slides}/>}

    </div>
}

interface ITestimonial {
    description: string
    img: string
    personName: string
    personTitle: string
}
