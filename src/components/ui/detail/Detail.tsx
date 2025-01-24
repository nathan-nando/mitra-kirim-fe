import React from "react";
import {camelCaseToReadable} from "@/utils/convertCamelCase";

type KeyValuePair = {
    [key: string]: string | number | boolean; // Adjust the type as needed
};

type DetailProps = {
    data: KeyValuePair;
};

export const Detail = ({data}: DetailProps) => {
    return (
        <div className="flex flex-column gap-3 p-3">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="d-flex flex-row gap-3 align-items-start text-black-custom">
                    {/* Key */}
                    <span className="key" style={{minWidth: "150px"}}>
            {camelCaseToReadable(key)}
          </span>
                    {/* Colon */}
                    <span>:</span>
                    {/* Value */}
                    <span className="value" style={{flex: 1}}>
            {value}
          </span>
                </div>
            ))}
        </div>
    );
};
