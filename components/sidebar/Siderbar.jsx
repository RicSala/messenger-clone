import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFotter";

const Siderbar = ({ children }) => {
    return (
        <div className="h-full">
            <DesktopSidebar />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
};
export default Siderbar;