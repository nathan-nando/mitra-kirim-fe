export const NavbarAdminData = (): NavbarType[] => {
    return [
        {
            title: "Dashboard",
            link: "",
            icon: "bi bi-house-fill"
        },
        {
            title: "Suggestion",
            link: "suggestion",
            icon: "bi bi-chat-left-text-fill"
        },
        {
            title: "Testimonial",
            link: "testimonial",
            icon: "bi bi-hand-thumbs-up-fill",
        },
        {
            title: "Location",
            link: "location",
            icon: "bi bi-map-fill"
        },
        {
            title: "Settings",
            link: "#",
            icon: "bi bi-gear-fill",
            children: [
                {
                    title: "General",
                    link: "settings/general",
                    icon: "bi bi-building-fill"
                },
                {
                    title: "Layout",
                    link: "settings/layout",
                    icon: "bi bi-layers-fill"
                },
                {
                    title: "Account",
                    link: "settings/account",
                    icon: "bi bi-person-fill-gear"
                },
            ]
        }
    ]
}

export type NavbarType = {
    title: string
    link: string
    icon: string
    children?: NavbarType[]
}
