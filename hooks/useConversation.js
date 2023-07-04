import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
    const params = useParams();

    // We memoize the conversationId so that it doesn't change every time the component re-renders
    const conversationId = useMemo(() => {
        if (!params?.conversationId) return ''

        return params.conversationId
    }, [params?.conversationId]);

    //REVIEW: Do we really need this? We have already memorize the conversationId
    const isOpen = useMemo(() => {
        return !!conversationId // turns into boolean
    }, [conversationId]);


    //REVIEW: same as above
    return useMemo(() => {
        return {
            conversationId,
            isOpen
        }
    }, [conversationId, isOpen])
}

export default useConversation;