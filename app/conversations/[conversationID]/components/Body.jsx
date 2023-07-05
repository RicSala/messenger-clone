'use client'

import useConversation from "@/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

const Body = ({
    initialMessages
}) => {

    const [messages, setMessages] = useState(initialMessages)

    const bottomRef = useRef(null)

    const { conversationId } = useConversation()

    console.log("MESSAGES LENGTH", messages.length)

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    return (
        <div className="flex-1 overflow-y-auto">
            {
                messages.map((message, index) => (
                    <MessageBox
                        key={message.id}
                        isLast={index === messages.length - 1}
                        data={message}
                    />
                ))
            }
            <div ref={bottomRef} className="pt-24" />
        </div>
    )
};
export default Body;