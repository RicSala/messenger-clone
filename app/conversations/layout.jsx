import Sidebar from "@/components/sidebar/Sidebar";

const conversationsLayout = ({ children }) => {
    return (
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
};
export default conversationsLayout;