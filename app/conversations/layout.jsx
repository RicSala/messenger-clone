import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "@/actions/getConversations";

const conversationsLayout = async ({ children }) => {

    const conversations = await getConversations()
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
};
export default conversationsLayout;