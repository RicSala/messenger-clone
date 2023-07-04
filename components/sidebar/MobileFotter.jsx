'use client'

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = (props) => {

    const routes = useRoutes()
    const { isOpen } = useConversation()

    // we hide the footer when the conversation is open
    if (isOpen) return null

    return (
        <div
            className="
        flex
        justify-between
        items-center
        fixed
        w-full
        bottom-0
        z-40
        bg-white
        border-t-[1px]
        lg:hidden
        "
        >
            {routes.map((item, index) => (
                <MobileItem
                    key={item.label}
                    href={item.href}
                    active={item.active}
                    icon={item.icon}
                    onClick={item.onClick}
                    label={item.label}
                />))}
        </div>
    )
};
export default MobileFooter;