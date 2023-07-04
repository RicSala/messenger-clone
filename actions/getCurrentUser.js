const { default: prisma } = require("@/libs/prismadb")
const { default: getSession } = require("./getSession")


const getCurrentUser = async () => {
    try {
        const session = await getSession()

        if (!session?.user?.email) return null

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
        })

        if (!currentUser) return null

        return currentUser

    } catch (error) {
        // REVIEW: "we are not gonna thrown any error because this is going to crash the application. This is a server action"
        return null
        console.log(error)
    }

}

export default getCurrentUser