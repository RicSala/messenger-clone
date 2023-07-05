
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation) => {

    const { data: session } = useSession()

    // const otherUser = conversation?.users?.find(user => user.id !== session?.user?.id)

    // return otherUser

    const otherUser = useMemo(() => {

        const currentUserEmail = session?.user?.email

        const otherUser = conversation?.users?.filter(
            user => user.email !== currentUserEmail
        )

        return otherUser[0]

    }, [conversation.users, session?.user?.email])

    return otherUser
}

export default useOtherUser;