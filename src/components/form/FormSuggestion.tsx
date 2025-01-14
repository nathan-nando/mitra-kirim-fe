import "./form-suggestion.css"

export function FormSuggestion() {
    const header = "Kritik dan Saran"
    const description = "Segera dapatkan penawaran menarik dan layanan terbaik untuk kebutuhan usaha hotel, restoran, dan cafe anda."
    return <div className={"form-suggestion d-flex flex-column gap-2 align-items-center text-black-custom"}>
        <h3>{header}</h3>
        <p>{description}</p>
        <form className={"d-flex flex-column gap-4 col-5"}>
            <div className={"d-flex flex-row justify-content-between"}>
                <div className="form-group col-5">
                    <label htmlFor="nameInput">Name</label>
                    <input type="text"
                           className="form-control"
                           id="nameInput"
                           aria-describedby="emailHelp"
                           placeholder="Enter name"/>
                </div>
                <div className="form-group col-5">
                    <label htmlFor="emailInput">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="emailInput"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="nameInput">Message</label>
                <div className="mb-3">
                    <textarea className="form-control" id="textareaMessage" rows={3}></textarea>
                </div>
            </div>

        </form>
    </div>
}
