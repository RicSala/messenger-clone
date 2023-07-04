'use client'

import Avatar from "@/components/Avatar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const UserBox = ({
    user
}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const clickHandler = useCallback(() => {
        setIsLoading(true)

        axios.post('/api/conversations', {
            userId: user.id
        })
            .then((res) => {
                router.push(`/conversations/${res.data.id}`)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [router, user.id])

    return (
        <div
            onClick={clickHandler}
            className="
            w-full
            relative
            flex
            items-center
            space-x-3
            bg-white
            p-3
            hover:bg-neutral-100
            rounded-lg
            transtion
            cursor-pointer
            "
        >
            <Avatar user={user} />
            <div className="
            min-w-0
            flex-1"
            >
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">
                            {user.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default UserBox;