"use client"

import {VisitorChart} from "@/components/ui/chart/VisitorChart";
import "./layout.css"
import {DashboardCard} from "@/components/ui/card/DashboardCard";
import {Breadcrumb} from "@/components/ui/breadcrumb/breadcrumb";
import {GetDashboardAPI} from "@/app/admin/action";
import React, {useEffect, useState} from "react";
import HorizontalLineLoading from "@/components/ui/loading/Horizontal";

interface IUser {
    viewerCount: number;
    suggestionCount: number;
    testimonialCount: number;
    locationCount: number;
}

export default function Admin() {
    const monthlyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const monthlyData = [65, 59, 80, 81, 56, 55, 40, 30, 30, 30, 30];

    const yearlyLabels = ["2020", "2021", "2022", "2023"];
    const yearlyData = [500, 700, 900, 1200];

    const [loading, setLoading] = useState(false)

    const [data, setData] = useState<IUser>({
        locationCount: 0,
        suggestionCount: 0,
        testimonialCount: 0,
        viewerCount: 0
    });

    useEffect(() => {
        getAPI()
    }, []);

    const getAPI = async () => {
        setLoading(true)
        await GetDashboardAPI()
            .then(data => {
                setLoading(false)
                setData({
                    ...data
                })
            })
            .catch(err => {
                setLoading(false)
            })
    }

    return <>
        <Breadcrumb items={["Dashboard"]}/>
        <div>
            {loading && <HorizontalLineLoading/>}
        </div>
        <div className="d-flex flex-row gap-5 ">
            <DashboardCard number={0} label={"Pengunjung Hari Ini"}/>
            <DashboardCard number={data.suggestionCount} label={"Total Saran"}/>
            <DashboardCard number={data.testimonialCount} label={"Total Testimoni"}/>
            <DashboardCard number={data.locationCount} label={"Total Cabang"}/>
        </div>

        <div className={"d-flex flex-column gap-5 ps-5 pt-5"}>
            <div>
                <h5>Pengunjung Bulanan</h5>
                <div className={"col-8"}>
                    <VisitorChart labels={monthlyLabels} data={monthlyData} title={"Data Bulanan"}/>
                </div>
            </div>

            <div>
                <h5>Pengunjung Tahunan</h5>
                <div className={"col-8"}>
                    <VisitorChart labels={yearlyLabels} data={yearlyData} title={"Data Tahunan"}/>
                </div>
            </div>
        </div>
    </>
}
