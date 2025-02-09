import Image from "next/image";
import "./hero.css"
import {withParagraphs} from "@/utils/helpers";

export function Hero({img, description, appDescription ="Selamat Datang"}) {

    const paragraphs = withParagraphs(description)


    const getImg = () => `/images/hero.jpg`

    return <div className={"hero"}>
        <h5
            className={"text-center fw-bold "}
            style={{whiteSpace: "pre-wrap"}}>
            {appDescription}
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

                <div className={"hero-description paragraph-justify"} style={{whiteSpace: "pre-wrap"}}
                >
                    <div>
                        {paragraphs.map((para, index) => (
                            <p key={index}>{para}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
