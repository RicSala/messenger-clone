import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";


const getConversationById = async (conversationId) => {

    try {

        const currentUser = await getCurrentUser()
        if (!currentUser) return null

        const conversation = prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true,
            }
        })

        return conversation

    } catch (error) {

        return null
    }

}

export default getConversationById;