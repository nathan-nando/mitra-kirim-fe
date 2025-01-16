import {NavbarGuest} from "@/components/navbar/navbar-guest/NavbarGuest";
import {Hero} from "@/components/hero/Hero";
import {Services} from "@/components/services/Services";
import {Testimonial} from "@/components/testimoni/Testimonial";
import {FormSuggestion} from "@/components/form/form-suggestion/FormSuggestion";
import {Location} from "@/components/location/Location";
import {Footer} from "@/components/layout/Footer";

export default function Home() {
    return (
        <>
            <NavbarGuest/>
            <Hero/>
            <Services/>
            <Testimonial/>
            <FormSuggestion/>
            <Location/>
            <Footer/>
        </>
    );
}
