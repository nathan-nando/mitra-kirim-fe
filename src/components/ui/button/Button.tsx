import {useFormStatus} from "react-dom";

export interface ButtonProps {
    name?:string
    className?:string
    type?:"button" | "submit" | "reset"
}

export default function Button({name = "Save", type = "button", className="btn-foreground"}:ButtonProps) {
    const {pending} = useFormStatus()

    return <button
        disabled={pending}
        type={type}
        className={`btn ${className}`}>
        {pending ? `${name}...` : name}
    </button>
}
