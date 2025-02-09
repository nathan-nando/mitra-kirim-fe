"use client"

import "./carousel.css"
import React, {useEffect,} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

export const CarouselCustom = ({slides}) => {
    const [emblaRef, emblaApi] =
        useEmblaCarousel({loop: true,watchDrag: false },
            [AutoScroll({
                speed: 1,
                stopOnInteraction: false,
                stopOnFocusIn: false,
                stopOnMouseEnter: false,
            })])

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()) // Access API
        }
        console.log("OK")
    }, [emblaApi])

    return (
        <div className="embla " ref={emblaRef}>
            <div className="embla__container">
                {slides.map((slide, index) => (
                    <div className="embla__slide" key={index}>
                        <Image
                            className={"embla-image-slide"}
                            src={`/api/images/testimonials/${slide}`} alt={`Slide ${index + 1}`}
                            width={100} height={60}/>
                    </div>
                ))}
            </div>
        </div>
    )
};

