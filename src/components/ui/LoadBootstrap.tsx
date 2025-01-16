"use client"

import {useEffect} from "react";

export default function LoadBootstrap() {
    useEffect(() => {
        import("bootstrap")
    }, [])

    return null
}
