import {NavbarGuest} from "@/components/navbar/navbar-guest/NavbarGuest";
import {Hero} from "@/components/hero/Hero";
import {Services} from "@/components/services/Services";
import {Testimonial} from "@/components/testimoni/Testimonial";
import {FormSuggestion} from "@/components/form/FormSuggestion";

export default function Home() {
    return (
        <>
            <NavbarGuest/>
            <Hero/>
            <Services/>
            <Testimonial/>
            <FormSuggestion/>
        </>
    );
}
