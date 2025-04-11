"use server"

import {NavbarGuest} from "@/components/navbar/navbar-guest/NavbarGuest";
import {Hero} from "@/components/hero/Hero";
import {Services} from "@/components/services/Services";
import {Testimonial} from "@/components/testimoni/Testimonial";
import {FormSuggestion} from "@/components/form/form-suggestion/FormSuggestion";
import {Location} from "@/components/location/Location";
import {Footer} from "@/components/layout/Footer";
import {ButtonSticky} from "@/components/ui/button/ButtonSticky";
import {getConfigurationAPI} from "@/app/(guest)/action";

interface IData {
    config: keyVal[]
    location: ILocation[]
    testimonials: string[]
}

interface keyVal {
    key: string
    type: string
    value: string
}

export interface ILocation {
    nama: string
    alamat: string
    deskripsi: string
    email: string
    whatsapp: string
    iframeLink: string
}

export default async function Home() {
    const data: IData = await getConfigurationAPI()
    const {config, location, testimonials} = data

    let heroImg, heroDesc, whatsappNumber, appName, appDescription , appLogo = ""
    const serviceData: any[] = []
    const socialData: any[] = []
    const tokoData: any[] = []


    config?.map(({key, type, value}) => {
        if (key === "appName") {
            appName = value
        } else if (key === "appDescription") {
            appDescription = value
        } else if (key === "appLogo") {
            appLogo = value
        }
        else if (key === "heroImg") {
            heroImg = value
        }
        else if (key === "heroDesc") {
            heroDesc = value
        } else if (key === "services") {
            const parsed: any[] = JSON.parse(value)
            serviceData.push(...parsed)
        } else if (key === "whatsapp") {
            whatsappNumber = value
        } else if (type === "SOCIAL_MEDIA_CONFIG") {
            socialData.push({key, value})
        } else if (type === "ONLINE_SHOP_CONFIG") {
            tokoData.push({key, value})
        }
    })

    return (
        <>
            <ButtonSticky whatsappNumber={whatsappNumber}/>
            <NavbarGuest whatsappNumber={whatsappNumber} appName={appName} appLogo={appLogo}/>
            <Hero img={heroImg} description={heroDesc} appDescription={appDescription}/>
            <Services data={serviceData}/>
            <Testimonial slides={testimonials}/>
            <FormSuggestion/>
            <Location locationList={location}/>
            <Footer socialMediaData={socialData} tokoData={tokoData}/>
        </>
    );
}
