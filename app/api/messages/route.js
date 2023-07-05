import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.redirect('/login')
        }

        const body = await req.json()

        const { message, image, conversationId } = body

        if (!message && !image) {
            return NextResponse.json(
                { error: 'No message or image provided' },
                { status: 400 })
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image,
                conversation: { // we already connected here...
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seenBy: {
                    connect: {
                        id: currentUser.id
                    }
                },
            },
            include: {
                seenBy: true,
                sender: true
            }
        })

        //REVIEW:  why do we need to update the conversation?
        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(), // I thought it was only beacause of this
                messages: {
                    connect: {
                        id: newMessage.id //REVIEW: is this necessary? What's it for?
                    }
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seenBy: true,
                    }
                }
            }
        })
        return NextResponse.json(newMessage, { status: 201 })
    } catch (err) {
        console.log(err, 'ERROR_MESSAGES')
        return NextResponse.json(
            { error: err.message }, { status: 500 })
    }
}