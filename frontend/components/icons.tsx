import React from "react";
import {IconSvgProps} from "@/types";

export const GithubIcon: React.FC<IconSvgProps> = ({
   size = 24,
   width,
   height,
   ...props
}) => {
    return (
        <svg
            height={size || height}
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                clipRule="evenodd"
                d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export const LogoutIcon: React.FC<IconSvgProps> = ({
     fill = 'currentColor',
     size,
     height,
     width,
     ...props
 }) => {
    return (
        <svg
            data-name="Iconly/Curved/Profile"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size || width || 24}
            height={size || height || 24}
            {...props}
        >
            <g
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            >
                <path
                    data-name="Stroke 1"
                    d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                />
                <path
                    data-name="Stroke 3"
                    d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
                />
            </g>
        </svg>
    );
};

export const HeartIcon: React.FC<IconSvgProps> = ({
                              fill = 'currentColor',
                              size,
                              height,
                              width,
                              ...props
                          }) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill={fill !== "" ? fill : 'none'}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                stroke={fill}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
