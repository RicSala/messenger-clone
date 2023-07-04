'use client'

import clsx from "clsx";

const Button = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            secondary={secondary}
            danger={danger}
            className={clsx(`
        flex
        justify-center
        rounded-md
        px-3
        py-2
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        `,
                disabled && 'opacity-50 cursor-default',
                fullWidth && 'w-full',
                !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600', // default button
                secondary ? 'text-gray-900' : 'text-white',
                danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:ring-rose-500',
            )}

        >
            {children}
        </button>
    )
};
export default Button;