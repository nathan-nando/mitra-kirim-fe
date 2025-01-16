type line = {
    size?: "s" | "m" | "l"
}

export function Line({size = "s"}: line) {
    const sizeLine = () => {
        if (size === "l") {
            return "w-100"
        } else if (size === "m") {
            return "w-50"
        }
        return "w-25"
    }
    return <hr className={`${sizeLine()} mx-auto line-accent`}/>
}
