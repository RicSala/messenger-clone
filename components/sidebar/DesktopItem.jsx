'use client'

import clsx from "clsx";
import Link from "next/link";


const DesktopItem = ({
    label,
    icon: Icon,
    href,
    active,
    onClick,


}) => {

    const onClickHandler = (e) => {
        if (onClick) {
            return onClick(e)
        }
    }

    return (
        <li
            onClick={onClickHandler}
            className="
        
        ">
            <Link className={clsx(`
            group
            flex
            gap-x-3
            rounded-md
            p-3
            text-sm
            leading-6
            font-semibold
            text-gray-500
            hover:text-black
            hover:bg-gray-100`,
                active && "bg-gray-100 text-black"
            )}
                href={href
                }>
                <Icon className="h-6 w-6 shrink-0" />
                {/* He says this is for SEO... */}
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    )
};
export default DesktopItem;