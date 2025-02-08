"use server"

import "./location.css"

type ILocation = {
    nama: string
    alamat: string
    deskripsi: string
    email: string
    whatsapp: string
    iframeLink: string
}

export async function Location(data: { locationList: ILocation[] }) {
    return <div className={"location"}>
        <div id="carouselExampleIndicators" className="carousel slide mb-5 location-carousel" data-bs-ride="carousel">
            <h4 className={"fw-bold"}>Lokasi kami</h4>
            <div className="carousel-indicators mb-3">
                {data.locationList.map((v, i) => {
                    return <button key={i} type="button"
                                   data-bs-target="#carouselExampleIndicators"
                                   data-bs-slide-to={i === data.locationList.length ? 0 : i}
                                   className={i === 0 ? "active" : ""}
                                   aria-label={v.nama}></button>
                })}
            </div>
            <div className="carousel-inner mx-auto ">
                {data.locationList.map((v, i) => {
                    return <div key={i} className={`carousel-item  ${i === 0 ? 'active' : ''}`}>
                        <iframe
                            className={"w-100 map-iframe"}
                            src={decodeURIComponent(v.iframeLink)}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                        <div className="map-description p-4 mt-0 pb-0 bg-foreground text-background mx-auto carousel-caption d-none d-md-block">
                            <h5 className={"fw-bold pb-2 text-accent fs-4"}>{v.nama}</h5>
                            <p className={"fs-5"}>{v.deskripsi}</p>
                            <div className={"pb-4 d-flex flex-row gap-2 justify-content-center"}>
                                <small><span className={"bi bi-envelope"}></span> {v.email} </small>
                                <small><span className={"bi bi-whatsapp"}></span> {v.whatsapp} </small></div>
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
    </div>
}
