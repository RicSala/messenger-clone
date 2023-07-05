import prisma from "@/libs/prismadb"
import getCurrentUser from "./getCurrentUser"


const getConversations = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser?.id) return []

    try {

        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc"
            },

            where: {
                userIds: { // if the user is in the conversation
                    has: currentUser.id
                }
            },

            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seenBy: true
                    }
                }
            }
        })

        return conversations

    } catch (error) {
        console.log(error)
        return []
    }

}

export default getConversations