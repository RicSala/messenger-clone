import prisma from "@/libs/prismadb";


const getMessages = (conversationId) => {

    try {

        const messages = prisma.message.findMany({
            where: {
                conversationId
            },
            include: {
                sender: true,
                seenBy: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return messages

    } catch (error) {
        return null
    }

}

export default getMessages;