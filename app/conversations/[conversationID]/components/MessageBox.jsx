'use client'

import Avatar from "@/components/Avatar";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

const MessageBox = ({
    isLast,
    data
}) => {

    console.log("IS LAST", isLast)

    const session = useSession()

    //REVIEW: fyi: we don't use ids in the frontend, we use the email address
    // const isOwn = session?.user?.id === data.sender.id
    const isOwn = session?.data?.user?.email === data.sender.email

    const seenList = (data.seenBy || []) //REVIEW: fyi: empty array just in case it's undefined
        .filter((user) => { return user.email !== data.sender.email })
        .map((user) => { return user.name })
        .join(", ")
    console.log("is own", isOwn)
    console.log("SEEN LIST", seenList)
    console.log("SEEN BY", data.seenBy)

    const container = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end",
    )

    const avatar = clsx(isOwn && "order-2")

    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end",
    )

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? "text-white bg-blue-500" : "bg-gray-100",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3",
    )

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), "p")}
                    </div>
                </div>
                <div className={message}>
                    {
                        data.image ? (
                            <Image
                                className="
                                object-cover
                                cursor-pointer
                                hover:scale-110
                                transition
                                translate
                                "
                                alt="message image"
                                src={data.image}
                                width={180}
                                height={180} />
                        ) : (
                            <div>{data.body}</div>
                        )
                    }
                </div>

                {
                    isLast && isOwn && data.seenBy.length > 1 && (
                        <div className="text-xs font-light text-gray-500">
                            {`Seen by ${seenList}`}
                        </div>
                    )
                }
            </div>
        </div>
    )
};
export default MessageBox;