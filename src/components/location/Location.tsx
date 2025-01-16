import "./location.css"

type location = {
    src: string
    title: string
    description: string
}

export function Location() {
    const getImg = () => `/images/hero.jpg`

    const listLocation: location[] = [
        {
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1581130408276!2d106.9133009!3d-6.242883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d01021dd817%3A0xa938efce571d975c!2sSupplier%20Hotel%20Resto%20Kafe!5e0!3m2!1sid!2sid!4v1737031394108!5m2!1sid!2sid',
            title: "Lokasi 1",
            description: "Jl. Taman No.12 Blok E6, Duren Sawit, Durensawit, East Jakarta City, Jakarta\n",
        },
        {
            src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6323026040245!2d106.88088169999999!3d-6.1799462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5002a9ac153%3A0xd6d0f772f4f2567c!2sMitra%20Kirim!5e0!3m2!1sid!2sid!4v1737031575133!5m2!1sid!2sid',
            title: "Lokasi 2",
            description: "Jl. Panca Wardi No.2, RT.2/RW.10, Kayu Putih, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13210",
        }
    ]

    return <>
        <div id="carouselExampleIndicators" className="carousel slide mb-5" data-bs-ride="carousel">
            <div className="carousel-indicators mb-4">
                <button type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"></button>
                <button type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
            </div>
            <div className="carousel-inner mx-auto ">
                {listLocation.map((v, i) => {
                    return <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                        <iframe
                            className={"w-100"}
                            height="600"
                            src={v.src}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                        <div className="shadow-sm p-4 mt-0 pb-0 bg-foreground text-background rounded-3 col-4 mx-auto carousel-caption d-none d-md-block">
                            <h5 className={"fw-bold pb-2 text-accent"}>{v.title}</h5>
                            <p className={"paragraph-justify"}>{v.description}</p>
                        </div>
                    </div>
                })}
            </div>
            <button className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </>
}
