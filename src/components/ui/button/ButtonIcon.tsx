import {useFormStatus} from "react-dom";

export default function ButtonIcon({icon = "bi-check", severity="primary", cb}) {
    const {pending} = useFormStatus()

    return <button
        onClick={cb}
        disabled={pending}
        type={"button"}
        className={`btn btn-${severity}`}>
        <span className={`bi ${icon}`}></span>
    </button>
}
