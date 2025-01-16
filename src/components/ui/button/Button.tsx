import {useFormStatus} from "react-dom";

export default function Button() {
    const {pending} = useFormStatus()

    return <button
        disabled={pending}
        type={"submit"}
        className={"btn btn-foreground"}>
        {pending ? "Submitting..." : "Submit"}
    </button>
}
