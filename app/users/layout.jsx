import Siderbar from "@/components/sidebar/Siderbar";

export default async function UsersLayout({
    children,
}) {
    return (
        <div className="h-full">
            <Siderbar>
                {children}
            </Siderbar>
        </div>
    )
}