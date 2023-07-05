'use client'

import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns'

const ConversationBox = ({
    data,
    selected,
}) => {

    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data?.messages || []
        return messages[messages.length - 1]
    }, [data?.messages])

    const userEmail = useMemo(() => {
        return session?.data?.user?.email
    }, [session?.data?.user?.email])

    console.log("LAST", lastMessage)

    const hasSeen = useMemo(() => {

        if (!lastMessage) return false

        // the session hook may take a while to load
        if (!userEmail) return false

        //what if the last message is from the current user?
        // if (lastMessage.user.email === userEmail) return false

        const seenArray = lastMessage.seenBy || []
        console.log("SEEN ARRAY", seenArray)

        return seenArray
            .filter((user) => user.email === userEmail).length !== 0;
    }, [userEmail, lastMessage]);

    console.log("HAS SEEN", hasSeen)
    console.log("USER EMAIL", userEmail)


    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return 'sent an Image'

        if (lastMessage?.body) return lastMessage.body

        return 'Started a conversation'
    }, [lastMessage])

    return (
        <div
            onClick={handleClick}
            className={clsx(`
            w-full
            relative
            flex
            items-center
            space-x-3
            hover:bg-neutral-100
            rounded-lg
            transition
            cursor-pointer
            p-3`,
                selected ? 'bg-neutral-100' : 'bg-white'
            )}>

            <Avatar user={otherUser} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="
                        text-lg
                        font-medium
                        text-gray-900
                        ">
                            {data.name || otherUser?.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="
                            text-xs
                            text-gray-400
                            font-light
                            ">
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`
                    truncate
                    text-sm`,
                        hasSeen ? 'text-gray-500' : 'text-black font-medium'
                    )
                    }>{lastMessageText}</p>
                </div>
            </div>
        </div>
    )
};
export default ConversationBox;