import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

// REVIEW: fyi: params are always the second
export async function POST(req, { params }) {

    try {

        //our current user has seen all the messages in this conversation

        const currentUser = await getCurrentUser()

        const { conversationId } = params

        if (!currentUser) return new NextResponse({ error: "Unauthorized" }, { status: 401 })

        // Find the existing conversation
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: { seenBy: true }
                },
                users: true
            }
        })

        if (!conversation) return new NextResponse({ error: "Conversation not found" }, { status: 404 })

        // Find the last message in the conversation
        const lastMessage = conversation.messages[conversation.messages.length - 1]

        // If there is not last msg, just return the conversation
        if (!lastMessage) return new NextResponse(conversation, { status: 200 })

        //REVIEW: Why the last message an not all unseen messages?
        // maybe has something to do with "pusher"?
        // update seenBy of the last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            data: {
                seenBy: { // REVIEW: fyi: We don't assign related records by id, we assign them
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seenBy: true,
                sender: true
            }
        })

        return NextResponse.json(updatedMessage, { status: 200 })


    } catch (error) {
        console.log(error, "ERROR SEEN ROUTE")
        //REVIEW: why do we need new here?
        return new NextResponse({ error: "Something went wrong" }, { status: 500 })
    }

}