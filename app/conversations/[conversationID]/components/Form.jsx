'use client'

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = ({
    // conversation //REVIEW: why getting again the conversation instead of passing it from the page?
}) => {

    const { conversationId } = useConversation()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit = (data) => {
        setValue('message', '', { shouldValidate: true })
        axios.post(`/api/messages`, { ...data, conversationId })
    }

    const handleUpload = (res) => {
        axios.post(`/api/messages`, {
            image: res.info.secure_url,
            conversationId
        })
    }



    return (
        <div className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
        ">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={(res) => { handleUpload(res) }}
                uploadPreset="euavxfr2"
            >
                <HiPhoto size={30} className="text-sky-500" />

            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                flex
                items-center
                gap-2
                lg:gap-4
                w-full"
            >
                <MessageInput
                    id="message"
                    name="message"
                    placeholder="Type a message"
                    register={register}
                    errors={errors}
                    required />

                <button
                    type="submit"
                    className="
                        rounded-full
                        p-2
                        bg-sky-500
                        cursor-pointer
                        hover:bg-sky-600
                        transition
                        ">
                    <HiPaperAirplane size={18} className="text-white" />

                </button>


            </form>
        </div>
    )
};
export default Form;