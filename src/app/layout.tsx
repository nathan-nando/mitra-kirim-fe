import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import LoadBootstrap from "@/components/ui/LoadBootstrap";
import {Toaster} from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mitra Kirim",
    description: "Mitra Kirim",
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <LoadBootstrap/>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster richColors/>
        {children}
        </body>
        </html>
    );
}
