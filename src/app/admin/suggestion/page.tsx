"use client"

import "./page.module.css"
import React, {useState} from "react";

type Suggestion = {
    id: string
    name: string
    email: string
}

export default function SuggestionAdm() {
    const data: Suggestion[] = [
        {
            id: "a1",
            name: "Alex sander",
            email: "alex@gmail.com",
        },
        {
            id: "t1",
            name: "Tian",
            email: "tian@gmail.com",
        },
        {
            id: "t2",
            name: "Tian",
            email: "tian@gmail.com",
        },
        {
            id: "1",
            name: "Tian",
            email: "tian@gmail.com",
        },
        {
            id: "1",
            name: "Tian",
            email: "tian@gmail.com",
        },
        {
            id: "1",
            name: "Tian",
            email: "tian@gmail.com",
        },
        {
            id: "1",
            name: "Tian",
            email: "tian@gmail.com",
        },
        {
            id: "1",
            name: "Tian",
            email: "tian@gmail.com",
        },
        {
            id: "1",
            name: "Tian",
            email: "tian@gmail.com",
        },

    ]

    const [dataFiltered, setDataFiltered] = useState(data)


    const onSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
        const searchString: string = event.target.value || ""
        setDataFiltered(data.filter(v => v.name.toLowerCase().includes(searchString.toLowerCase())))
    }

    return <div className={"p-4 suggestion d-flex flex-column gap-3"}>
        <h5 className={"fw-bold"}>Saran</h5>
        {/*<div className={"border border-1 p-4 rounded-2"}>*/}
        {/*    <h5 className={"fw-bold"}>Filter Data</h5>*/}
        {/*</div>*/}
        <div className={"col-lg-12 d-flex flex-column align-items-end"}>
            <div className="col-3">
                <input type={"text"}
                       name={"search"}
                       className={"form-control"}
                       onInput={onSearch}
                       placeholder={"Cari..."}/>
            </div>
        </div>

        <table className="table">
            <thead>
            <tr>
                <th scope="col">No</th>
                <th scope="col">Nama Pengirim</th>
                <th scope="col">Email Pengirim</th>
                <th scope="col">Tanggal</th>
                <th scope="col" className={"text-center"}>Aksi</th>
            </tr>
            </thead>
            <tbody>
            {dataFiltered.map((v, i) => {
                return <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>{new Date().toDateString()}</td>
                    <td className={"d-flex justify-content-center flex-row gap-2"}>
                        <button type="button" className="btn btn-outline-primary btn-link text-decoration-none"><i
                            className={"bi bi-search"}></i> Lihat
                        </button>
                        <button type="button" className="btn btn-outline-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                            <i className={"bi bi-reply"}></i> Balas
                        </button>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
        <div className="d-flex flex-row justify-content-between pagination gap-5">
            <nav aria-label="suggestion">
                <ul className="pagination">
                    <li className={"page-item"}><span className={"page-link border-0 text-muted"} style={{fontSize: "small"}}>Data per halaman</span></li>
                    <li className="page-item"><a className="page-link text-foreground active" href="#">10</a></li>
                    <li className="page-item"><a className="page-link text-foreground" href="#">25</a></li>
                    <li className="page-item"><a className="page-link text-foreground" href="#">50</a></li>
                    <li className="page-item"><a className="page-link text-foreground" href="#">100</a></li>
                </ul>
            </nav>
            <nav aria-label="suggestion">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link text-foreground" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link text-foreground" href="#">1</a></li>
                    <li className="page-item"><a className="page-link text-foreground" href="#">2</a></li>
                    <li className="page-item"><a className="page-link text-foreground" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link text-foreground" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>


        <div className="modal modal-lg fade"
             id="exampleModal"
             tabIndex={-1}
             aria-labelledby="modalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalLabel">Balas Email</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
