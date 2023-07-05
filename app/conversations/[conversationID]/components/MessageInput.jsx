'use client'


const MessageInput = ({
    id,
    name,
    placeholder,
    register,
    errors,
    required,
    type,
}) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                name={name}
                autoComplete={id}
                type={type} //REVIEW: why type of text gives it a weird look?
                placeholder={placeholder}
                {...register(name, { required })}
                className="
                text-black
                font-light
                py-2
                px-4
                bg-neutral-100
                w-full
                rounded-full
                focus:outline-none
                "
            />



        </div>
    )
};
export default MessageInput;