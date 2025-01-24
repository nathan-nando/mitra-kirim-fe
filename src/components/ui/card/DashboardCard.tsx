type DashboardCardProps = {
    number: number | string; // The number to highlight
    label: string; // The label below the number
    icon?: React.ReactNode; // Optional icon
    backgroundColor?: string; // Optional background color
    textColor?: string; // Optional text color
};

export const DashboardCard = ({
                                  number,
                                  label,
                                  backgroundColor = "bg-light",
                                  textColor = "text-gray-900",
                              }: DashboardCardProps) => {
    return (
        <div
            className={`${backgroundColor} ${textColor} text-black-custom p-3 rounded-3 shadow-sm col-2 d-flex flex-column`}
        >
            <div className="fw-bold fs-5 font-bold"><h1 className={"text-center"}>{number}</h1></div>
            <div className="mt-2 text-center "><small>{label}</small></div>
        </div>
    );
};

