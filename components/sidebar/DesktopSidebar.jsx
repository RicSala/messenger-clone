'use client'

import useRoutes from "@/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = ({ children }) => {

    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="
        hidden
        lg:flex
        lg:flex-col
        lg:fixed
        lg:inset-y-0
        lg:left-0
        lg:z-40
        lg:w-20
        xl:px-6
        lg:overflow-y-auto
        lg:bg-white
        lg:border-r-[1px]
        lg:pb-4
        justify-between
        ">
            <nav className="
            flex
            flex-col
            justify-between
            mt-4">
                <ul role="list" className="
                flex
                flex-col
                items-center
                space-y-1
                ">
                    {routes.map((item, index) => (
                        <DesktopItem
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                            onClick={item.onClick}
                        />))}

                </ul>

            </nav>
        </div>
    )
};
export default DesktopSidebar;