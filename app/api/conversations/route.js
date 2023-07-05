const { default: getCurrentUser } = require("@/actions/getCurrentUser");
const { default: prisma } = require("@/libs/prismadb");
const { NextResponse } = require("next/server");


export async function POST(req) {
    try {
        const currentUser = await getCurrentUser(req)

        const body = await req.json()

        const {
            // for individual chat
            userId,

            // for group chat
            isGroup,
            members, //members are ids, not total users
            name, // of the groupchat
        } = body

        if (!currentUser?.id || !currentUser?.email) { // if the user is not logged in
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (isGroup && (!members || members.length < 2 || !name)) { // if the user is trying to create a group chat but the data is invalid
            return NextResponse.json({ error: "Invalid data" }, { status: 400 })
        }

        if (isGroup) { // if group chat and valid data
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [ // connect the members and the current user to the new conversation
                            ...members.map((member) => ({
                                id: member.value // REVIEW: why value?
                            })),
                            { id: currentUser.id }
                        ]
                    }
                },
                include: {
                    users: true // include the users in the response
                }
            })

            return NextResponse.json(newConversation)
        }

        // If individual chat -> let's check if there is already a conversation between the two users
        const existingConversations = await prisma.conversation.findMany({ //why findMany? because the query we are gonna use only supports findMany
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0]

        if (singleConversation) {
            return NextResponse.json(singleConversation)
        }

        // individual chat and no existing conversation -> create a new one
        const newConversation = await prisma.conversation.create({
            data: {
                isGroup: false,
                users: {
                    connect: [
                        { id: userId },
                        { id: currentUser.id }
                    ]
                }
            },
            include: {
                users: true
            }
        })

        return NextResponse.json(newConversation)

    } catch (error) {
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}
