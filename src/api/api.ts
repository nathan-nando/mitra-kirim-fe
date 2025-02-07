import {urlBE} from "@/utils/env";

export const apiSuggestion =  "/suggestion"
export const apiAuth =  "/auth"
export const apiLocation =  "/location"
export const apiConfiguration =  "/configuration"
export const apiTestimonial =  "/testimonial"
export const apiLayout =  "/layout"
export const apiSettings =  "/settings"


export const getApi = (endpoint:string) =>{
    return urlBE() + endpoint
}
