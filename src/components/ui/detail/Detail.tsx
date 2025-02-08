import React from "react";
import {camelCaseToReadable} from "@/utils/convertCamelCase";
import {formatDate} from "@/utils/date";

type KeyValuePair = {
    [key: string]: string | number | boolean; // Adjust the type as needed
};

type DetailProps = {
    data: any;
};

const blackList = ["id", "img", "slide"]
const toDateFormat = ["createdDate", "updatedDate"]

export const Detail = ({data}: DetailProps) => {
    return (
        <div className="flex flex-column gap-3 p-3">
            {Object.entries(data).map(([key, value]) => {
                if (!blackList.includes(key)) {
                    return (
                        <div key={key} className="d-flex flex-row gap-3 align-items-start text-black-custom mb-1">
                            {/* Key */}
                            <span className="key" style={{minWidth: "150px"}}>
            {camelCaseToReadable(key)}
          </span>
                            {/* Colon */}
                            <span>:</span>
                            {/* Value */}
                            <span className="value" style={{flex: 1}}>
                                {toDateFormat.includes(key) ? formatDate(String(value)) : String(value)}
          </span>
                        </div>
                    )
                }
            })}
        </div>
    );
};
