import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";


const ConversationPage = async ({ params }) => {

    const conversation = await getConversationById(params.conversationID)
    const messages = await getMessages(params.conversationID)

    if (!conversation) return (

        //TODO: This should return a 404 page (SEO)
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <EmptyState title="Conversation not found" />
            </div>
        </div>
    )

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    )
};
export default ConversationPage;