"use client"

import "./page.module.css"
import React, {useEffect, useState} from "react";
import {GetAllAPI} from "@/app/admin/suggestion/action";

type Suggestion = {
    id: string
    name: string
    email: string
    message: string
    hasReplied: string
}

type Pagination = {
    currentPage: number
    dataPerPage: number
    totalData: number
}

type initialData = {
    suggestions: Suggestion[],
    pagination: Pagination,
}

export default function SuggestionAdm() {
    const suggestions: Suggestion[] = [
        // {
        //     id: "a1",
        //     name: "Alex sander",
        //     email: "alex@gmail.com",
        // },
        // {
        //     id: "t1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
        // {
        //     id: "t1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // }, {
        //     id: "t1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
        // {
        //     id: "t1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
        //
        // {
        //     id: "t2",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
        // {
        //     id: "1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
        // {
        //     id: "1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
        // {
        //     id: "1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
        // {
        //     id: "1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
        // {
        //     id: "1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
        // {
        //     id: "1",
        //     name: "Tian",
        //     email: "tian@gmail.com",
        // },
    ]

    useEffect(() => {
        GetAllAPI()
            .then((v => {
                console.log(v)
            }))
    }, [])

    const initialData: initialData = {
        suggestions,
        pagination: {
            totalData: 305,
            dataPerPage: 10,
            currentPage: 1
        }
    }

    const [state, setState] = useState(initialData)


    const [dataFiltered, setDataFiltered] =
        useState(
            initialData.suggestions.slice(0, state.pagination.dataPerPage)
        )


    return <div className={" p-4 suggestion d-flex flex-column gap-3"}>
        <h5 className={"fw-bold"}>Saran</h5>


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
