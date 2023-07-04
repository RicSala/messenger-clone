'use client'

import UserBox from "./UserBox";

const UserList = ({
    items
}) => {
    return (
        <aside className="
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        block
        w-full
        left-0
        ">
            {/*REVIEW: what makes does it make to use a div just for px5?? */}
            <div className="px-5">
                <div className="flex-col">
                    <div className="
                    text-2xl
                    font-bold
                    text-neutral-800
                    py-4
                    ">
                        Users
                    </div>
                    {
                        items.map((item, index) => (
                            <UserBox
                                key={item.id}
                                user={item}
                            />))
                    }
                </div>
            </div>
        </aside>
    )
};
export default UserList;