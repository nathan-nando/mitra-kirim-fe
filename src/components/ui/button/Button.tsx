import {useFormStatus} from "react-dom";

export default function Button({name= "Submit"}) {
    const {pending} = useFormStatus()

    return <button
        disabled={pending}
        type={"submit"}
        className={"btn btn-foreground"}>
        {pending ? `${name}...` : name}
    </button>
}
