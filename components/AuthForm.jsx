'use client'

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import Input from "./inputs/Input";
import { useRouter } from "next/navigation";

// Variant type definition just for reference
// type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = (props) => {

    const session = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [router, session?.status])

    const [variant, setVariant] = useState('LOGIN')
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                name: 'Ricardo',
                email: 'ricardo@google.com',
                password: '88888888',
            }
        }
    )

    const togleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const onSubmit = async (data) => {
        setIsLoading(true)
        if (variant === 'REGISTER') {
            await axios.post('/api/register', data)
                .then((response) => {
                    toast.success("User created")
                    signIn('credentials', data)
                })
                .catch((error) => {
                    toast.error("Something went wrong")
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
        if (variant === 'LOGIN') {
            // nextauth login
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((response) => {
                    if (response.error) {
                        toast.error(response.error)
                    }

                    if (response.ok && !response.error) {
                        toast.success("Welcome back")
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                    router.push('/users')
                })
        }
    }

    // TODO: configure the providers (github, google). Aka: register the app
    const socialAction = async (action) => {
        setIsLoading(true)
        // NextAuth social login

        signIn(action, { redirect: false })
            .then((response) => {
                if (response?.error) {
                    toast.error(response.error)
                }

                if (response?.ok && !response?.error) {
                    toast.success("Welcome back")
                }
            })
            .finally(() => {
                setIsLoading(false)
            }
            )
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

                {/* <form className="space-y-6" 39:04*/}
                <form className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}>

                    {variant === 'REGISTER' && (
                        <Input label="Name" register={register} id="name" errors={errors} disabled={isLoading} type="text" />
                    )}
                    <Input label="Email" register={register} id="email" errors={errors} disabled={isLoading} type="text" />
                    <Input label="Password" register={register} id="password" errors={errors} disabled={isLoading} type="password" />
                    <Button disabled={isLoading} fullWidth type='submit'>{
                        variant === 'LOGIN' ? 'Login' : 'Register'
                    }</Button>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="
                        absolute
                        inset-0
                        flex
                        items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="
                            relative
                            flex
                            justify-center
                            text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-6">
                        <AuthSocialButton icon={BsGithub} onClick={() => { socialAction('github') }} />
                        <AuthSocialButton icon={BsGoogle} onClick={() => { socialAction('google') }} />
                    </div>
                </div>

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                    </div>
                    <div onClick={togleVariant} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthForm;



// 'use client';

// import axios from "axios";
// import { signIn, useSession } from 'next-auth/react';
// import { useCallback, useEffect, useState } from 'react';
// import { BsGithub, BsGoogle } from 'react-icons/bs';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { useRouter } from "next/navigation";

// import { toast } from "react-hot-toast";
// import Input from "./Input";
// import AuthSocialButton from "./AuthSocialButton";
// import Button from "./Button";


// const AuthForm = () => {
//     const router = useRouter();
//     const [variant, setVariant] = useState('LOGIN');
//     const [isLoading, setIsLoading] = useState(false);


//     const {
//         register,
//         handleSubmit,
//         formState: {
//             errors,
//         }
//     } = useForm({
//         defaultValues: {
//             name: '',
//             email: '',
//             password: ''
//         }
//     });

//     const onSubmit = (data) => {
//         setIsLoading(true);

//         if (variant === 'REGISTER') {
//             axios.post('/api/register', data)
//                 .then(() => signIn('credentials', {
//                     ...data,
//                     redirect: false,
//                 }))
//                 .then((callback) => {
//                     if (callback?.error) {
//                         toast.error('Invalid credentials!');
//                     }

//                     if (callback?.ok) {
//                         router.push('/conversations')
//                     }
//                 })
//                 .catch(() => toast.error('Something went wrong!'))
//                 .finally(() => setIsLoading(false))
//         }

//         if (variant === 'LOGIN') {
//             signIn('credentials', {
//                 ...data,
//                 redirect: false
//             })
//                 .then((callback) => {
//                     if (callback?.error) {
//                         toast.error('Invalid credentials!');
//                     }

//                     if (callback?.ok) {
//                         router.push('/conversations')
//                     }
//                 })
//                 .finally(() => setIsLoading(false))
//         }
//     }

//     const socialAction = (action) => {
//         setIsLoading(true);

//         signIn(action, { redirect: false })
//             .then((callback) => {
//                 if (callback?.error) {
//                     toast.error('Invalid credentials!');
//                 }

//                 if (callback?.ok) {
//                     router.push('/conversations')
//                 }
//             })
//             .finally(() => setIsLoading(false));
//     }

//     return (
//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//             <div
//                 className="
//         bg-white
//           px-4
//           py-8
//           shadow
//           sm:rounded-lg
//           sm:px-10
//         "
//             >
//                 <form
//                     className="space-y-6"
//                     onSubmit={handleSubmit(onSubmit)}
//                 >
//                     {variant === 'REGISTER' && (
//                         <Input
//                             disabled={isLoading}
//                             register={register}
//                             errors={errors}
//                             required
//                             id="name"
//                             label="Name"
//                         />
//                     )}
//                     <Input
//                         disabled={isLoading}
//                         register={register}
//                         errors={errors}
//                         required
//                         id="email"
//                         label="Email address"
//                         type="email"
//                     />
//                     <Input
//                         disabled={isLoading}
//                         register={register}
//                         errors={errors}
//                         required
//                         id="password"
//                         label="Password"
//                         type="password"
//                     />
//                     <div>
//                         <Button disabled={isLoading} fullWidth type="submit">
//                             {variant === 'LOGIN' ? 'Sign in' : 'Register'}
//                         </Button>
//                     </div>
//                 </form>

//                 <div className="mt-6">
//                     <div className="relative">
//                         <div
//                             className="
//                 absolute
//                 inset-0
//                 flex
//                 items-center
//               "
//                         >
//                             <div className="w-full border-t border-gray-300" />
//                         </div>
//                         <div className="relative flex justify-center text-sm">
//                             <span className="bg-white px-2 text-gray-500">
//                                 Or continue with
//                             </span>
//                         </div>
//                     </div>

//                     <div className="mt-6 flex gap-2">
//                         <AuthSocialButton
//                             icon={BsGithub}
//                             onClick={() => socialAction('github')}
//                         />
//                         <AuthSocialButton
//                             icon={BsGoogle}
//                             onClick={() => socialAction('google')}
//                         />
//                     </div>
//                 </div>
//                 <div
//                     className="
//             flex
//             gap-2
//             justify-center
//             text-sm
//             mt-6
//             px-2
//             text-gray-500
//           "
//                 >
//                     <div>
//                         {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
//                     </div>
//                     <div
//                         onClick={() => { }}
//                         className="underline cursor-pointer"
//                     >
//                         {variant === 'LOGIN' ? 'Create an account' : 'Login'}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AuthForm;