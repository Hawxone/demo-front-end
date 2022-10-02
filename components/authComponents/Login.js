import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {registerUser, userLogin} from "../../public/src/features/UserSlice";
import {useRouter} from "next/router";

const LoginComponent = () => {
    const router = useRouter();
    const initialState = {
        username:"",
        password:"",
        isRemember:false
    }

    const { loading, error,userInfo } = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const [userState, setUserState] = useState(initialState);

    const handleInputChange = event => {
        const { id, value } = event.target;
        setUserState({ ...userState, [id]: value });
    };

    const handleCheckboxChange = event=>{
        setUserState({...userState,isRemember: event.target.checked})
    }

    const submitForm = (e)=>{
        let username = userState.username;
        let password = userState.password;
        dispatch(userLogin({username,password}))
    }

    useEffect(() => {
        if(userInfo) router.push("/")
    }, [router, userInfo]);




    return (
        <div className={"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"}>
            <div className={"flex items-center mb-6 text-2xl font-semibold text-gray-900"}>
                <Image className={"w-8 h-8 mr-2"} src={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"} height={40} width={40} />
                Flowbite
            </div>
            <div className={"w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-5 "}>
                <div className={"p-6 space-y-4 md:space-y-6 sm:p-8"}>
                    <h1 className={"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"}>
                        Sign In to your account
                    </h1>

                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="username"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Your
                                username</label>
                            <input type="text" name="username" id="username" value={userState.username||""} onChange={handleInputChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   placeholder="username" required="" />
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" value={userState.password||""} onChange={handleInputChange}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                   required=""/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="IsRemember" aria-describedby="remember" type="checkbox" checked={userState.isRemember||false} onChange={handleCheckboxChange}
                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                                           required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 ">Remember
                                        me</label>
                                </div>
                            </div>
                            <a href="#"
                               className="text-sm font-medium text-primary-600 hover:underline ">Forgot
                                password?</a>
                        </div>
                        <button type="button" onClick={submitForm}
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign
                            in
                        </button>
                        <p className="text-sm font-light text-gray-500 ">
                            Don’t have an account yet? <Link href={"/auth/register"}
                                                          className="font-medium text-primary-600 hover:underline">Sign
                            up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
